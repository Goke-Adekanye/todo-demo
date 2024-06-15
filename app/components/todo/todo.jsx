"use client";

import { useEffect, useRef, useState } from "react";

function Todo({ todo, editTodo, checkTodo, deleteTodo }) {
  const [editText, setEditText] = useState(todo.text);
  const [openForm, setOpenForm] = useState(false);

  const editInput = useRef(null);

  const handleFocus = () => {
    if (editInput.current) {
      editInput.current.focus();
    }
  };

  const handleForm = () => {
    setOpenForm(!openForm);
  };

  useEffect(() => {
    if (openForm) {
      handleFocus();
    }
  }, [openForm]);

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <div className="flex justify-between items-center border-b border-gray-primary h-4 p-4">
        <p
          className="font-semibold text-xs py-[1px] px-4 text-black rounded-xl border border-gray-primary cursor-pointer"
          onClick={handleForm}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleFocus();
            }
          }}
        >
          Edit
        </p>
        <div className="flex items-center ">
          <input
            type="checkbox"
            className="w-3 mr-2"
            checked={todo.completed}
            onChange={() => {
              checkTodo(todo.id);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className="w-4 text-black-light select-none cursor-pointer focus:outline-none"
            viewBox="0 0 24 24"
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
          </svg>
        </div>
      </div>
      <div
        className={`flex items-center justify-start p-4 text-sm ${
          todo.completed ? "line-through" : ""
        }`}
      >
        <span>{todo.text}</span>
      </div>
      {openForm ? (
        <div className="border-t border-gray-primary">
          <form
            className="flex justify-between pl-0 pr-5"
            method="POST"
            onSubmit={(e) => {
              editTodo(e, todo.id, editText);
              setOpenForm(false);
            }}
          >
            <input
              aria-label="Edit todo"
              autoComplete="off"
              className="text-xs text-gray-base w-full mr-3 py-3 px-4"
              type="text"
              placeholder="Edit Todo..."
              value={editText}
              onChange={({ target }) => setEditText(target.value)}
              ref={editInput}
            />
            <button
              className={`text-sm font-bold text-blue-medium ${
                !editText && "opacity-25"
              }`}
              type="submit"
              disabled={editText.length < 1}
            >
              Done
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Todo;
