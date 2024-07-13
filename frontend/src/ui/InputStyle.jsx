function InputStyle({ label = "", margin = 4, children, error }) {
  return (
    <div className={`mb-${margin}`}>
      <div className={`md:flex`}>
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            {label}
          </label>
        </div>
        <div className="md:w-2/3">{children}</div>
      </div>

      {error && <p className="text-red-500 w-2/3 ml-[33%]">*{error.msg}</p>}
    </div>
  );
}

export default InputStyle;
