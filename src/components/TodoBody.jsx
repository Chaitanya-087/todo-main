import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Delete from "../assets/images/icon-cross.svg";
import Check from "../assets/images/icon-check.svg";
import useStore from "../utils/store";

const TABS = {
  all: "all",
  active: "active",
  completed: "completed",
};

const TodoBody = () => {
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const [activeTab, setActiveTab] = useState(TABS.all);
  const activeTodos = useStore((state) => state.activeTodos);
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const toggleTodo = useStore((state) => state.toggleTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const clearCompleted = useStore((state) => state.clearCompleted);
  const calculateActiveTodos = useStore((state) => state.calculateActiveTodos);
  const setActiveTabValue = useCallback((tab) => setActiveTab(tab), []);
  const reorderTodos = useStore((state) => state.reorderTodos);

  useEffect(() => {
    calculateActiveTodos();
  },[todos])

  const filteredTodos = useMemo(() => {
    switch (activeTab) {
      case TABS.active:
        return todos.filter((todo) => !todo.completed);
      case TABS.completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },[todos,activeTab])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const title = e.target.todo.value;
    if (!title.trim()) return;
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    addTodo(capitalizedTitle)
    e.target.reset();
  };

  const handleDragStart = (e, id) => {
    dragItem.current = id;
  }

  const handleDragEnter = (e, id) => {
    dragOverItem.current = id;
  }
  
  const handleDrop = () => {
    reorderTodos(dragItem.current, dragOverItem.current)
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <React.Fragment>
      <form className='todo_form' onSubmit={handleFormSubmit}>
        <label className='check-circle' htmlFor='todo_form-input'></label>
        <input
          id='todo_form-input'
          type='text'
          placeholder='Create a new todo...'
          autoComplete='off'
          name='todo'
        />
      </form>

      <div className='todo_container'>
        <ul className='todo_list'>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className='todo_item'
              data-complete={todo.completed}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id)}
              onDragEnter={(e) => handleDragEnter(e, todo.id)}
              onDragEnd ={handleDrop}>
              <div
                className='check-circle'
                onClick={() => toggleTodo(todo.id)}>
                {todo.completed && <img src={Check} alt='complete' />}
              </div>
              <p className='todo_text'>{todo.title}</p>
              <button
                className='delete-btn'
                aria-label='Delete this todo'
                onClick={() => deleteTodo(todo.id)}>
                <img src={Delete} alt='cross' />
              </button>
            </li>
          ))}
        </ul>

        <div className='todo_footer'>
          <span>{activeTodos} items left</span>
          <ul
            className='todo_tabs hide-on-mobile'
            aria-label='Select a filter option'
            data-active={activeTab}>
            <li>
              <button
                className='tab_btn'
                data-value='all'
                onClick={() => setActiveTabValue("all")}>
                All
              </button>
            </li>
            <li>
              <button
                className='tab_btn'
                data-value='active'
                onClick={() => setActiveTabValue("active")}>
                Active
              </button>
            </li>
            <li>
              <button
                className='tab_btn'
                data-value='completed'
                onClick={() => setActiveTabValue("completed")}>
                Completed
              </button>
            </li>
          </ul>
          <button
            className='clear-btn'
            aria-label='Clear all completed todos'
            onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
      <ul
        className='todo_tabs md'
        aria-label='Select a filter option'
        data-active={activeTab}>
        <li>
          <button
            className='tab_btn'
            data-value='all'
            onClick={() => setActiveTabValue("all")}>
            All
          </button>
        </li>
        <li>
          <button
            className='tab_btn'
            data-value='active'
            onClick={() => setActiveTabValue("active")}>
            Active
          </button>
        </li>
        <li>
          <button
            className='tab_btn'
            data-value='completed'
            onClick={() => setActiveTabValue("completed")}>
            Completed
          </button>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default TodoBody;
