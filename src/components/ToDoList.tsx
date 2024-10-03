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
		<ul className='todo-list-container'>
			{todos.map((todo, index) => (
				<Draggable 
					key={todo.id}
					draggableId={todo.id.toString()}
					index={index}
				>
					{(provided, snapshot) => (
						<li 
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							className={`
								${todo.complete ? 
								'todo-list__item todo-list__item_complete' : 
								'todo-list__item'} 
								${snapshot.isDragging ?
								'dragging' :
								'none'}
							`}
						>
							<input 
								className='todo-list__input-checkbox'
								type='checkbox'
								checked={todo.complete}
								onChange={() => toggleTodoComplete(todo.id)}
							/>
							<span className='todo-list__item-title'>{todo.title}</span>
							<button 
								className='todo-list__button-delete-todo'
								onClick={() => deleteTodo(todo.id)}>Del
							</button>
						</li>
					)}
				</Draggable>
			))}
		</ul>
	);
};

export default ToDoList;