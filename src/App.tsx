import React, { FC, useEffect, useState } from 'react';
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

	useEffect(() => {
		const todosState: string | null = localStorage.getItem('todosState');
		if (todosState) {
			setTodos(JSON.parse(todosState));
		}
	}, []);

	return (
		<div className="App">
			<div className="container">
				<h1>TO-DO-APP</h1>
				<ToDoAddForm 
					addToDo={addTodo}
				/>
				<ToDoList 
					todos={todos}
					toggleTodoComplete={toggleTodoComplete}
					deleteTodo={deleteTodo}
				/>	
			</div>
		</div>
	);
}

export default App;
