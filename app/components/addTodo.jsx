const AddTodo = ({ addText, setAddText, handleSubmit }) => {
  return (
    <div className="border border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={handleSubmit}
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
  );
};

export default AddTodo;
