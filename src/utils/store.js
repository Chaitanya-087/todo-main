import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { persist } from 'zustand/middleware'

const data = [
    {
        id: uuidv4().slice(0, 8),
        title: "Complete online JavaScript course",
        completed: true

    },
    {
        id: uuidv4().slice(0, 8),
        title: "Jog around the park 3x",
        completed: false
    },
    {
        id: uuidv4().slice(0, 8),
        title: "10 minutes meditation",
        completed: false
    },
    {
        id: uuidv4().slice(0, 8),
        title: "Read for 1 hour",
        completed: false
    },
    {
        id: uuidv4().slice(0, 8),
        title: "Pick up groceries",
        completed: false
    },
    {
        id: uuidv4().slice(0, 8),
        title: "Complete Todo App on Frontend Mentor",
        completed: false
    }
]

let useTodoStore = set => ({
    todos: data,
    activeTodos: 5,
    calculateActiveTodos: () => set(state => ({ activeTodos: state.todos.filter(todo => !todo.completed).length })),
    addTodo: (title) => set(state => ({
        todos: [...state.todos, {
            id: uuidv4().slice(0, 8),
            title,
            completed: false
        }],
    })),

    toggleTodo: (id) => set(state => ({
        todos: state.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    })),

    deleteTodo: (id) => set(state => ({
        todos: state.todos.filter(todo => todo.id !== id)
    })),
    clearCompleted: () => set(state => ({
        todos: state.todos.filter(todo => !todo.completed)
    })),
    reorderTodos: (srcID,destID) => set(state => {
        const copiedItems = [...state.todos]
        const [removedItem] = copiedItems.splice(srcID, 1);
        copiedItems.splice(destID, 0, removedItem);
        return {
            todos: [...copiedItems]
        }
    })
})


useTodoStore = persist(useTodoStore, { name: 'todo-app' })
useTodoStore = create(useTodoStore)

export default useTodoStore;