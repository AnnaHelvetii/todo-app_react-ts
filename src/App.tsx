import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Todo from './models/Todo';
import ToDoList from './components/ToDoList';
import ToDoAddForm from './components/ToDoAddForm';
import './App.css';

const App: FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = (title: string) => {
		const newTodo: Todo = {
            id: Date.now(),
            title: title,
            complete: false,
        };

		const newTodosList: Todo[] = [...todos, newTodo];
		setTodos(newTodosList);

		localStorage.setItem('todosState', JSON.stringify(newTodosList));
    }

    const deleteTodo = (id: number) => {
		const newTodosList: Todo[] = todos.filter(todo => todo.id !== id);
        setTodos(newTodosList);

		localStorage.setItem('todosState', JSON.stringify(newTodosList));
    };

	const toggleTodoComplete = (id: number) => {
		const newTodosList: Todo[] = todos.map(todo =>
			todo.id === id ? {...todo, complete: !todo.complete} : todo);
		setTodos(newTodosList);

		localStorage.setItem('todosState', JSON.stringify(newTodosList));
	};

	const handleOnDragEnd = (result: any) => {
		const { destination, source } = result;
		if (!destination || (
			source.droppableId === destination.droppableId &&
			source.index === destination.index)) {
				return;
			}
		const updatedTodos = Array.from(todos);
		const [movedTodo] = updatedTodos.splice(source.index, 1);
		if (source.droppableId !== destination.droppableId) {
			movedTodo.complete = destination.droppableId === 'completed';
		}
		updatedTodos.splice(destination.index, 0, movedTodo);
		setTodos(updatedTodos);
		localStorage.setItem('todosState', JSON.stringify(updatedTodos));
	};

	useEffect(() => {
		const todosState: string | null = localStorage.getItem('todosState');
		if (todosState) {
			setTodos(JSON.parse(todosState));
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
										todos={todos.filter(todo => !todo.complete)}
										toggleTodoComplete={toggleTodoComplete}
										deleteTodo={deleteTodo}
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
										todos={todos.filter(todo => todo.complete)}
										toggleTodoComplete={toggleTodoComplete}
										deleteTodo={deleteTodo}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</DragDropContext>
			</div>
		</div>
	);
}

export default App;
