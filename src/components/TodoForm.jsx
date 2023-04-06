import React, { useRef } from "react";
import useTodoStore from "../utils/store";

const TodoForm = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const inputRef = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const title = inputRef.current.todo.value;
    if (!title.trim()) return;

    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    addTodo(capitalizedTitle);
    inputRef.current.reset();
  };

  return (
    <form className='todo_form' onSubmit={handleFormSubmit} ref={inputRef}>
      <label className='check-circle' htmlFor='todo_form-input'></label>
      <input
        id='todo_form-input'
        type='text'
        placeholder='Create a new todo...'
        autoComplete='off'
        name='todo'
      />
    </form>
  );
};

export default TodoForm;
