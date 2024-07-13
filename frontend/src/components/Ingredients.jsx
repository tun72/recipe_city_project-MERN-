

function Ingredients({ children }) {

  return (
    <div>
      <h4 className="text-orange-500 font-bold mb-2">Ingredients</h4>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

export default Ingredients;
