import Operation from "../ui/Operation";
import Ingredients from "./Ingredients";
import Button from "../ui/Button";
import IngredientItem from "./IngredientItem";

function RecipeCard({
  recipe,
  isClamp = false,
  handelIngredient = null,
  handelDelete = null,
}) {
  const { _id, title, description, ingredients } = recipe;

  return (
    <div className="bg-white p-5 rounded-lg w-full  relative shadow-lg border border-gray-200">
      <div className=" space-y-3 mb-8">
        <h3 className="text-xl font-bold text-orange-500">{title}</h3>

        <div className="">
          <h4 className="text-orange-500 font-bold mb-2">Description</h4>
          <p className={`${isClamp ? "line-clamp-1" : ""} break-all`}>
            {description}
          </p>
        </div>
        <Ingredients>
          {ingredients &&
            ingredients.map((ing, i) => (
              <IngredientItem
                ing={ing}
                key={i}
                index={i}
                handelIngredient={handelIngredient}
              />
            ))}
        </Ingredients>
      </div>

      {isClamp && (
        <Operation>
          <Button color={"orange"} to={"/edit-recipe/?id=" + _id}>
            Edit
          </Button>
          <Button
            color={"red"}
            handelFunction={() => {
              handelDelete(_id);
            }}
          >
            Delete
          </Button>
        </Operation>
      )}
    </div>
  );
}

export default RecipeCard;
