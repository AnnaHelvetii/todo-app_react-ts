import React, { FC, useState } from 'react';

interface ToDoAddFormProps {
	addToDo: (title: string) => void;
}

const ToDoAddForm: FC<ToDoAddFormProps> = ({ addToDo }) => {
	const [title, setTitle] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title.trim()) {
			addToDo(title);
			setTitle('');
		}
	}

	return (
		<form 
			className='add-todo-form'
			onSubmit={handleSubmit}
		>
			<input
				className='add-todo-form__input'
				type="text"
				placeholder="Add new To-Do"
				value={title}
				onChange={handleChange}
			/>
			<button
				className='add-todo-form__button'
				type='submit'>Add</button>
		</form>
	);
}

export default ToDoAddForm;