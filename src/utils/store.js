import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import {persist} from 'zustand/middleware'

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

let useStore = (set, get) => ({
    todos: data,
    activeTodos: 5,
    calculateActiveTodos: () => set(state => ({ activeTodos: state.todos.filter(todo => !todo.completed).length })),
    // activeTodos:() => set(state => state.todos.filter(todo => !todo.completed).length),
    addTodo: (title) => set(state => ({
        todos: [...state.todos, {
            id: uuidv4().slice(0, 8),
            title,
            completed: false
        }]
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
    reorderTodos: (startId, endId) => set(state => {
        const startIndex = state.todos.findIndex(todo => todo.id === startId)
        const endIndex = state.todos.findIndex(todo => todo.id === endId)
        const result = [...state.todos]
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return { todos: result }
    })
})


useStore = persist(useStore, { name: 'todo-app' })
useStore = create(useStore)

export default useStore;