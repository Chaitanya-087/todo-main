import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Delete from "../assets/images/icon-cross.svg";
import Check from "../assets/images/icon-check.svg";
import useTodoStore from "../utils/store";
import {useMediaQuery} from "react-responsive";
import TodoForm from "./TodoForm";
import Tabs from "./Tabs";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const TABS = {
  all: "all",
  active: "active",
  completed: "completed",
};

const TodoBody = () => {
  const isMobile = useMediaQuery({query: "(max-width: 768px)"});
  const [activeTab, setActiveTab] = useState(TABS.all);

  const activeTodos = useTodoStore((state) => state.activeTodos);
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const calculateActiveTodos = useTodoStore(
    (state) => state.calculateActiveTodos
  );
  const reorderTodos = useTodoStore((state) => state.reorderTodos);

  useEffect(() => {
    calculateActiveTodos();
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (activeTab) {
      case TABS.active:
        return todos.filter((todo) => !todo.completed);
      case TABS.completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, activeTab]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <React.Fragment>
      <TodoForm />
      <div className='todo_container'>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId='todos'>
            {(provided) => (
              <ul
                className='todo_list'
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} index={index} draggableId={todo.id}>
                    {(provided,snapshot) => (
                      <li
                        key={todo.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='todo_item'
                        data-complete={todo.completed}
                        data-isdragging={snapshot.isDragging}>
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        <div className='todo_footer'>
          <span>{activeTodos} items left</span>
          {!isMobile && (
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isMobile={isMobile}
            />
          )}
          <button
            className='clear-btn'
            aria-label='Clear all completed todos'
            onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
      {isMobile && (
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={isMobile}
        />
      )}
    </React.Fragment>
  );
};

export default TodoBody;
