import InputStyle from "../ui/InputStyle";
import plus from "../assets/img/plus.svg";
import RecipeLayout from "../ui/RecipeLayout";
import RecipePreview from "./RecipePreview";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { URL } from "../utils/constant";
import Input from "../ui/Input";

function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [errors, setErrors] = useState({});

  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search);
  let id = searchQuery.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(URL + "/api/recipes/" + id);

      if (response.status === 200) {
        const { title, description, ingredients } = response.data.recipe;
        setTitle(title);
        setDescription(description);
        setIngredients(ingredients);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  function addIngredient() {
    if (!ingredient) return;
    setIngredients((prev) => [...prev, ingredient]);
    setIngredient("");
  }

  function handelIngredient(ing, index) {
    if (ing === "") {
      return setIngredients((prev) => prev.filter((_, ind) => ind !== index));
    }
    setIngredients((prev) => {
      prev[index] = ing;

      return [...prev];
    });
  }

  let submit = async (e) => {
    try {
      e.preventDefault();
      let recipe = {
        title,
        description,
        ingredients,
      };
      let res;
      if (id) {
        res = await axios.patch(URL + "/api/recipes/" + id + "/update", recipe);
      } else {
        res = await axios.post(URL + "/api/recipes", recipe);
      }
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setErrors(e.response.data.message);
    }
  };

  return (
    <RecipeLayout
      isSplit={title || description || ingredients.length ? true : false}
    >
      <form
        className="w-full  bg-white  p-10 rounded-lg max-w-lg mx-auto"
        onSubmit={submit}
      >
        <div className="mb-6">
          <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800">
            {`${id ? "Update " : "New "}`}{" "}
            <span className="text-orange-500 ">Recipe</span>
          </h1>
        </div>
        <InputStyle label={"title"} margin={5} error={errors?.title}>
          <Input value={title} setFunction={setTitle}></Input>
        </InputStyle>
        <InputStyle
          label={"description"}
          margin={5}
          error={errors?.description}
        >
          <textarea
            id="message"
            rows="4"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            className="bg-gray-200  p-2.5 w-full text-sm text-gray-900 rounded border focus:ring-orange-500 focus:border-orange-500 "
          >
            {description}
          </textarea>
        </InputStyle>
        <InputStyle
          label={"ingredients"}
          margin={5}
          error={errors?.ingredients}
        >
          <div className="flex space-x-2 items-center">
            <Input value={ingredient} setFunction={setIngredient}></Input>
            <img
              src={plus}
              alt=""
              className="cursor-pointer"
              onClick={addIngredient}
            />
          </div>
        </InputStyle>

        <InputStyle>
          <button
            className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {`${id ? "Update" : "Create"}`} Recipe
          </button>
        </InputStyle>
      </form>
      <RecipePreview
        title={title}
        description={description}
        ingredients={ingredients}
        handelIngredient={handelIngredient}
      />
    </RecipeLayout>
  );
}

export default RecipeForm;
