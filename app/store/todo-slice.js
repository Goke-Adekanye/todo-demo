import { create } from "zustand";

const useStore = create((set) => ({
  todos: [],

  addTodo: (addText) => {
    const newTodo = {
      id: Math.random(),
      text: addText,
      completed: false,
    };
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  editTodo: (id, editText) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          todo.text = editText;
        }
        return todo;
      }),
    }));
  },

  checkTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    }));
  },
}));

export default useStore;
