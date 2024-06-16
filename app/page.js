"use client";

import { useEffect, useState } from "react";
import MainLayout from "./components/MainLayout";
import Todo from "./components/todo";
import { useShallow } from "zustand/react/shallow";
import useStore from "./store/todo-slice";
import AddTodo from "./components/addTodo";
import FilterTodo from "./components/filterTodo";

function Home() {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [addText, setAddText] = useState("");
  const [category, setCategory] = useState("All");

  const { todos, addTodo, deleteTodo, editTodo, checkTodo } = useStore(
    useShallow((state) => ({
      todos: state.todos,
      addTodo: state.addTodo,
      deleteTodo: state.deleteTodo,
      editTodo: state.editTodo,
      checkTodo: state.checkTodo,
    }))
  );

  const filterCategories = [
    { name: "All" },
    { name: "Incomplete" },
    { name: "Completed" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(addText);
    setAddText("");
  };

  useEffect(() => {
    if (addText.length >= 1) {
      setCategory("All");
    }
  }, [addText.length]);

  useEffect(() => {
    if (todos) {
      const filteredTodos = todos.filter((todo) => {
        if (category === "All") {
          return true;
        }
        if (category === "Completed") {
          return todo.completed;
        }
        if (category === "Incomplete") {
          return !todo.completed;
        }
      });
      setFilteredTodos(filteredTodos);
    }
  }, [category, todos]);

  return (
    <MainLayout>
      <div className="lg:grid lg:grid-cols-3 gap-8 lg:justify-between lg:mx-auto max-w-screen-lg max-lg:flex max-lg:flex-col-reverse">
        <div className="container mx-auto lg:col-span-1 max-sm:w-4/5">
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              checkTodo={checkTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
        <div className="container mx-auto lg:col-span-2 max-sm:w-4/5">
          <AddTodo
            addText={addText}
            setAddText={setAddText}
            handleSubmit={handleSubmit}
          />

          <FilterTodo
            category={category}
            setCategory={setCategory}
            filterCategories={filterCategories}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
