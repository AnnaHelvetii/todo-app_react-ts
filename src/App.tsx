import React, { FC, useState } from 'react';
import Todo from './models/Todo';
import ToDoList from './components/ToDoList';
import './App.css';

const App: FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState<string>('');

    const addTodo = () => {
        if (newTodoTitle.trim() === '') return;

        const newTodo: Todo = {
            id: Date.now(),
            title: newTodoTitle,
            complete: false,
        };

        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

	const toggleTodoComplete = (id: number) => {
		setTodos(todos.map(todo =>
			todo.id === id ? {...todo, complete: !todo.complete} : todo
		));
	};

	return (
		<div className="App">
			<h1>TO-DO-APP</h1>
			<ToDoList 
				todos={todos}
				toggleTodoComplete={toggleTodoComplete}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
}

export default App;
