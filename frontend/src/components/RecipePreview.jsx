import RecipeCard from "./RecipeCard";

function RecipePreview({ title, description, ingredients=[], handelIngredient }) {
  const recipe = {
    title,
    description,
    ingredients,
  };

  return (
    <>
      {!!(title || description || ingredients.length) && (
        <div className="w-full  px-10 py-1">
          <h1 className="mb-5 bg-white text-gray-400 max-w-lg rounded-lg p-2 font-bold">
            Recipe / <span className="text-orange-500">Preview</span>
          </h1>

          <RecipeCard recipe={recipe} handelIngredient={handelIngredient} />
        </div>
      )}
    </>
  );
}

export default RecipePreview;
