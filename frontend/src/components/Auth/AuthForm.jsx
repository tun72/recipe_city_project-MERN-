import { Link, useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import RecipeInput from "../../ui/InputStyle";
import { useState } from "react";
import axios from "axios";
import { URL } from "../../utils/constant";
import { useAuthContext } from "../../context/AuthContext";

function AuthForm({ type }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  async function handelSubmit(e) {
    e.preventDefault();

    const data = { email, password };
    if (type === "register") {
      data["name"] = name;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(URL + "/api/auth/" + type, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Authentication Error");
      }

      navigate("/");
      dispatch({ type: "login", payload: response.data.user });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form
      className="bg-white p-5 rounded-lg w-[40%] mx-auto mt-[2rem]  relative shadow-lg border border-gray-200"
      onSubmit={handelSubmit}
    >
      <div className="mb-6">
        <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 font-mono">
          Create New Account
        </h1>
      </div>

      {type === "register" && (
        <RecipeInput label="name" margin={6}>
          <Input value={name} setFunction={setName} />
        </RecipeInput>
      )}
      <RecipeInput label="email" margin={6}>
        <Input value={email} setFunction={setEmail} />
      </RecipeInput>

      <RecipeInput label="pasword" margin={6}>
        <Input type="password" value={password} setFunction={setPassword} />
      </RecipeInput>
      <RecipeInput margin={6}>
        <button
          className={`shadow flex gap-2 items-center bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded
            ${!!isLoading && "bg-orange-500/95"}`}
          type="submit"
          disabled={isLoading}
        >
          {!isLoading && <>{type}</>}
          {isLoading && <>Loading ...</>}
        </button>
      </RecipeInput>
      {type === "register" ? (
        <div className="flex items-center justify-center">
          Already have account?
          <Link to="/login" className="text-orange-500 underline">
            Login
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          New Account?
          <Link to="/register" className="text-orange-500 underline">
            Register
          </Link>
        </div>
      )}
    </form>
  );
}

export default AuthForm;
