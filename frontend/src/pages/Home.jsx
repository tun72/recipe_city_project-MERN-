import { useState } from "react";
import { useEffect } from "react";
import RecipeCard from "../components/Recipe/RecipeCard";
import { URL } from "../utils/constant";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState(null);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const page = parseInt(searchQuery.get("page")) || 1;
  const navigate = useNavigate();
  const length = recipes.length;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const req = await axios.get(URL + "/api/recipes" + "/?page=" + page, {
          withCredentials: true,
        });

        if (!req.status === 200) {
          return alert("ERROR");
        }

        console.log(req);
        const data = req.data;
        clearInterval;
        setRecipes(data.recipes);

        setPagination(data.pagination);
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      } catch (e) {
        alert(e);
      }
    };

    fetchRecipes();
  }, [page, length]);

  const handelDelete = async (_id) => {
    5;
    const req = await axios.delete(URL + "/api/recipes/" + _id + "/delete");
    if (req.status === 200) {
      if (recipes.length === 1 && page > 1) {
        navigate("/?page=" + (page - 1));
      } else {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id != _id)
        );
      }
    } else {
      return alert("ERROR");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-6 lg:p-4 px-[2rem]">
        {recipes.length !== 0 &&
          recipes.map((recipe, i) => (
            <RecipeCard
              recipe={recipe}
              isClamp={true}
              key={i}
              handelDelete={handelDelete}
            />
          ))}
      </div>

      {!!pagination && <Pagination pagination={pagination} />}
    </>
  );
}

export default Home;
