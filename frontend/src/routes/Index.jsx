import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import RecipeForm from "../components/Recipe/RecipeForm.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import App from "../App";

import { useAuthContext } from "../context/AuthContext.jsx";

function Route() {
  const { user } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/new-recipe",
          element: user ? <RecipeForm /> : <Navigate to={"/login"} />,
        },
        {
          path: "/edit-recipe",
          element: user ? <RecipeForm /> : <Navigate to={"/login"} />,
        },
        {
          path: "/register",
          element: !user ? <Register /> : <Navigate to={"/"} />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Route;
