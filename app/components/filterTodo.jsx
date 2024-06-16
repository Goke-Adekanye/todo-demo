const FilterTodo = ({ category, setCategory, filterCategories }) => {
  return (
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
            className={`text-xs font-bold py-[1px] px-4 rounded-xl  border  ${
              category === item.name
                ? "border-black bg-black text-white"
                : "border-blue-medium text-blue-medium"
            }`}
            type="button"
            onClick={() => setCategory(item.name)}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterTodo;
