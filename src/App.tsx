import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Todo from './models/Todo';
import ToDoList from './components/ToDoList';
import ToDoAddForm from './components/ToDoAddForm';
import './App.css';
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
			source.index === destination.index)) {
				return;
			}
		
		let sourceItems = source.droppableId === 'incomplete' 
			? Array.from(incompleteTodos) 
			: Array.from(completedTodos);
		let destinationItems = destination.droppableId === 'incomplete' 
			? Array.from(incompleteTodos) 
			: Array.from(completedTodos);
		
		const [movedTodo] = sourceItems.splice(source.index, 1);

		if (source.droppableId !== destination.droppableId) {
			movedTodo.complete = destination.droppableId === 'completed';
		}

		destinationItems.splice(destination.index, 0, movedTodo);

		if (source.droppableId === 'incomplete') {
			setIncompleteTodos(sourceItems);
		} else {
			setCompletedTodos(sourceItems);
		}

		if (destination.droppableId === 'incomplete') {
			setIncompleteTodos(destinationItems);
		} else {
			setCompletedTodos(destinationItems);
		}

		localStorage.setItem('incompleteTodos', JSON.stringify(sourceItems));
		localStorage.setItem('completedTodos', JSON.stringify(destinationItems));
	};

	useEffect(() => {
		const incompletedState: string | null = localStorage.getItem('incompleteTodos');
		const completedState: string | null = localStorage.getItem('completedTodos');
		if (incompletedState) {
			setIncompleteTodos(JSON.parse(incompletedState))
		}
		if (completedState) {
			setCompletedTodos(JSON.parse(completedState))
		}
	}, []);

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
