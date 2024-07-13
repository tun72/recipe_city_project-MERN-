function Input({ value, setFunction, type="text" }) {
  return (
    <input
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
      type={type}
      value={value}
      onChange={(e) => {
        setFunction(e.target.value);
      }}
    />
  );
}

export default Input;
