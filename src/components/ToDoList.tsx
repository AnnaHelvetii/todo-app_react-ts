import React, { FC } from 'react';
import ToDoItem from './ToDoItem';
import Todo from '../models/Todo';

interface ToDoListProps {
	todos: Todo[],
	toggleTodoComplete: (id: number) => void;
	deleteTodo: (id: number) => void;
}

const ToDoList: FC<ToDoListProps> = ({ todos, toggleTodoComplete, deleteTodo }) => {
	return (
		<ul>
			{todos.map(todo =>
				<ToDoItem
					key={todo.id} 
					todo={todo} 
					toggleTodoComplete={toggleTodoComplete}
					deleteTodo={deleteTodo}
				/>
			)}
		</ul>
	);
}

export default ToDoList;