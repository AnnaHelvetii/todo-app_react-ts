import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './App.css';
import Todo from './models/Todo';
import ToDoList from './components/ToDoList';
import ToDoAddForm from './components/ToDoAddForm';
import Footer from './components/Footer';

const App: FC = () => {
	const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const addTodo = (title: string) => {
		const newTodo: Todo = {
            id: Date.now(),
            title: title,
            complete: false,
        };

		const newTodosList: Todo[] = [...incompleteTodos, newTodo];
		setIncompleteTodos(newTodosList);
		localStorage.setItem('incompleteTodos', JSON.stringify(newTodosList));
    }

    const deleteTodo = (id: number, isComplete: boolean) => {
		if (isComplete) {
			const newCompletedTodos: Todo[] = completedTodos.filter(todo => todo.id !== id);
			setCompletedTodos(newCompletedTodos);
			localStorage.setItem('completedTodos', JSON.stringify(newCompletedTodos));
		} else {
			const newIncompletedTodos: Todo[] = incompleteTodos.filter(todo => todo.id !== id);
			setIncompleteTodos(newIncompletedTodos);
			localStorage.setItem('incompleteTodos', JSON.stringify(newIncompletedTodos));
		}
    };

	const toggleTodoComplete = (id: number) => {
		const isIncompleteTodo = incompleteTodos.some(todo => todo.id === id);
		const isCompletedTodo = completedTodos.some(todo => todo.id === id);
	
		if (isIncompleteTodo) {
			const updatedIncompleteTodos = incompleteTodos.filter(todo => todo.id !== id);
			const completedTodo = incompleteTodos.find(todo => todo.id === id)!;
			completedTodo.complete = true;
			const updatedCompletedTodos = [...completedTodos, completedTodo];
	
			setIncompleteTodos(updatedIncompleteTodos);
			localStorage.setItem('incompleteTodos', JSON.stringify(updatedIncompleteTodos));
			setCompletedTodos(updatedCompletedTodos);
			localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
		} 

		else if (isCompletedTodo) {
			const updatedCompletedTodos = completedTodos.filter(todo => todo.id !== id);
			const incompleteTodo = completedTodos.find(todo => todo.id === id)!;
			incompleteTodo.complete = false;
			const updatedIncompleteTodos = [...incompleteTodos, incompleteTodo];
	
			setCompletedTodos(updatedCompletedTodos);
			localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));	
			setIncompleteTodos(updatedIncompleteTodos);
			localStorage.setItem('incompleteTodos', JSON.stringify(updatedIncompleteTodos));
		}
	};
	

	const handleOnDragEnd = (result: any) => {
		const { destination, source } = result;
		if (!destination || (
				source.droppableId === destination.droppableId && 
				source.index === destination.index
				)
			) {
			return;
			}
		if (source.droppableId === destination.droppableId) {
			if (source.droppableId === 'incomplete') {
				const newIncompleteTodos = [
					...incompleteTodos.slice(0, source.index), 
					...incompleteTodos.slice(source.index + 1),
				];
				const movedTodo = incompleteTodos[source.index];
				const updatedIncompleteTodos = [
					...newIncompleteTodos.slice(0, destination.index),
					movedTodo,
					...newIncompleteTodos.slice(destination.index),
				];
				setIncompleteTodos(updatedIncompleteTodos);
			} else if (source.droppableId === 'completed') {
				const newCompletedTodos = [
				...completedTodos.slice(0, source.index),
				...completedTodos.slice(source.index + 1),
				];
				const movedTodo = completedTodos[source.index];
				const updatedCompletedTodos = [
					...newCompletedTodos.slice(0, destination.index),
					movedTodo,
					...newCompletedTodos.slice(destination.index),
				];
				setCompletedTodos(updatedCompletedTodos);
			}
		} else {
			let sourceItems = source.droppableId === 'incomplete' ? incompleteTodos : completedTodos;
			let destinationItems = destination.droppableId === 'incomplete' ? incompleteTodos : completedTodos;
			const newSourceItems = [
				...sourceItems.slice(0, source.index),
				...sourceItems.slice(source.index + 1),
			];
			const movedTodo = sourceItems[source.index];
			movedTodo.complete = destination.droppableId === 'completed';
			const newDestinationItems = [
				...destinationItems.slice(0, destination.index),
				movedTodo,
				...destinationItems.slice(destination.index),
			];
			if (source.droppableId === 'incomplete') {
				setIncompleteTodos(newSourceItems);
				setCompletedTodos(newDestinationItems);
			} else {
				setCompletedTodos(newSourceItems);
				setIncompleteTodos(newDestinationItems);
			}
		}
	};

	useEffect(() => {
		const incompletedState = localStorage.getItem('incompleteTodos');
		const completedState = localStorage.getItem('completedTodos');
		if (incompletedState) {
			setIncompleteTodos(JSON.parse(incompletedState));
		}
		if (completedState) {
			setCompletedTodos(JSON.parse(completedState));
		}
	}, []);

	useEffect(() => {
		if (incompleteTodos.length > 0) {
		localStorage.setItem('incompleteTodos', JSON.stringify(incompleteTodos));
	}
		if (completedTodos.length > 0) {
			localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
		}
	}, [incompleteTodos, completedTodos]);

	return (
		<div className='App'>
			<div className='container'>
				<h1 className='main-title'>Daily notes</h1>
				<ToDoAddForm 
					addToDo={addTodo}
				/>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<div className='todo-lists'>
						<Droppable droppableId='incomplete'>
							{(provided) => (
								<div
									className='todo-list incomplete'
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<h2 className='todo-list__title'>To-Do:</h2>
									<ToDoList 
										todos={incompleteTodos}
										toggleTodoComplete={toggleTodoComplete}
										deleteTodo={id => deleteTodo(id, false)}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<Droppable droppableId='completed'>
							{(provided) => (
								<div
									className='todo-list completed'
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<h2 className='todo-list__title'>Done!</h2>
									<ToDoList 
										todos={completedTodos}
										toggleTodoComplete={toggleTodoComplete}
										deleteTodo={id => deleteTodo(id, true)}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</DragDropContext>
			</div>
			<Footer />
		</div>
	);
}

export default App;
