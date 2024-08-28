import React, { FC, useState } from 'react';
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

        setTodos([...todos, newTodo]);
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
