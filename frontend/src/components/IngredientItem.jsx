import { useState } from "react";

function IngredientItem({ ing, index, handelIngredient }) {
  const [isEdit, setIsEdit] = useState(false);
  const [ingredient, setIngredient] = useState(ing);

  function handelSubmit(e) {
    e.preventDefault();
   
    handelIngredient(ingredient, index);
    setIsEdit(false);
  }

  if (handelIngredient === null) {
    return (
      <li>
        <span className=" me-2">😋</span>
        <span
          onDoubleClick={() => {
            setIsEdit(true);
          }}
          className="text-gray-600 font-bold"
        >
          {ing}
        </span>
      </li>
    );
  }
  return (
    <>
      <li className="flex items-center gap-2">
        <span>😋</span>
        {!isEdit && (
          <span
            onDoubleClick={() => {
              setIsEdit(true);
            }}
            className="text-gray-600 font-bold"
          >
            {ing}
          </span>
        )}

        {isEdit && (
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => {
                setIngredient(e.target.value);
              }}
              className="border-2 border-orange-500  outline-none pe-2"
            />
          </form>
        )}
      </li>
    </>
  );
}

export default IngredientItem;
