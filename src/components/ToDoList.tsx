import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Todo from '../models/Todo';

interface ToDoListProps {
	todos: Todo[],
	toggleTodoComplete: (id: number) => void;
	deleteTodo: (id: number) => void;
}

const ToDoList: FC<ToDoListProps> = ({ todos, toggleTodoComplete, deleteTodo }) => {
	return (
		<ul>
			{todos.map((todo, index) => (
				<Draggable 
					key={todo.id}
					draggableId={todo.id.toString()}
					index={index}
				>
					{(provided) => (
						<li 
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							className={todo.complete ? 'todo-complete' : 'none'}
						>
							<input 
								className='input_checkbox'
								type="checkbox"
								checked={todo.complete}
								onChange={() => toggleTodoComplete(todo.id)}
							/>
							<span>{todo.title}</span>
							<button onClick={() => deleteTodo(todo.id)}>Delete To-Do</button>
						</li>
					)}
				</Draggable>
			))}
		</ul>
	);
};

export default ToDoList;