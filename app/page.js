"use client";

import { useEffect, useState } from "react";
import MainLayout from "./components/MainLayout";
import Todo from "./components/todo/todo";

function Home() {
  const [todos, setTodos] = useState([]);
  const [filteredtodos, setFilteredTodos] = useState([]);
  const [addText, setAddText] = useState("");
  const [category, setCategory] = useState("All");

  const filterCategories = [
    { name: "All" },
    { name: "Incomplete" },
    { name: "Completed" },
  ];

  useEffect(() => {
    if (addText.length > 1) {
      setCategory("All");
    }
  }, [addText.length]);
  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      const parsedTodos = JSON.parse(todos);
      const filteredTodos = parsedTodos.filter((todo) => {
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
      setTodos(filteredTodos);
    }
  }, [category]);

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Math.random(),
      text: addText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setAddText("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTodo = (e, id, editText) => {
    e.preventDefault();

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const checkTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <MainLayout>
      <div className="lg:grid lg:grid-cols-3 gap-8 lg:justify-between lg:mx-auto max-w-screen-lg max-lg:flex max-lg:flex-col-reverse">
        <div className="container mx-auto lg:col-span-1 max-sm:w-4/5">
          {todos.map((todo) => (
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
          <div className="border border-gray-primary">
            <form
              className="flex justify-between pl-0 pr-5"
              method="POST"
              onSubmit={addTodo}
            >
              <input
                aria-label="Add a Todo"
                autoComplete="off"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                type="text"
                placeholder="Add Todo..."
                value={addText}
                onChange={({ target }) => setAddText(target.value)}
              />
              <button
                className={`text-sm font-bold text-blue-medium ${
                  !addText && "opacity-25"
                }`}
                type="submit"
                disabled={addText.length < 1}
              >
                Add
              </button>
            </form>
          </div>

          <div className="my-8">
            <p className="mb-4 text-gray-500 font-bold">Filter Todo:</p>
            {filterCategories.map((item) => (
              <div
                className="flex flex-row items-center align-items justify-between p-4 border-b border-gray-primary"
                key={item.name}
              >
                <div className="flex items-center">
                  <p className="font-normal text-sm">{item.name}</p>
                </div>

                <button
                  className="text-xs font-bold py-[1px] px-4 rounded-xl text-blue-medium border border-blue-medium"
                  type="button"
                  onClick={() => setCategory(item.name)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
