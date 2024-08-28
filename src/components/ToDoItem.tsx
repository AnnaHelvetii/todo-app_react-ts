import React, { FC } from 'react';
import Todo from '../models/Todo';

interface ToDoItemProps {
	todo: Todo;
	toggleTodoComplete: (id: number) => void;
	deleteTodo: (id: number) => void;
};

const ToDoItem: FC<ToDoItemProps> = ({ todo, toggleTodoComplete, deleteTodo }) => {
	return (
		<li className={todo.complete ? 'todo-complete' : 'none'}>
			<input 
				className='input_checkbox'
				type="checkbox"
				checked={todo.complete}
				onChange={() => toggleTodoComplete(todo.id)}
			/>
			<span>{todo.title}</span>
			<button onClick={() => deleteTodo(todo.id)}>Delete To-Do</button>
		</li>
	);
}

export default ToDoItem;