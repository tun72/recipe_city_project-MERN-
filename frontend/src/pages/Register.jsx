import { Link } from "react-router-dom";
import Input from "../ui/Input";
import RecipeInput from "../ui/InputStyle";

function Register() {
  return (
    <form className="bg-white p-5 rounded-lg w-[40%] mx-auto mt-[2rem]  relative shadow-lg border border-gray-200">
      <div className="mb-6">
        <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 font-mono">
          Create New Account
        </h1>
      </div>
      <RecipeInput label="name" margin={6}>
        <Input />
      </RecipeInput>
      <RecipeInput label="email" margin={6}>
        <Input />
      </RecipeInput>
      <RecipeInput label="pasword" margin={6}>
        <Input type="password" />
      </RecipeInput>
      <RecipeInput margin={6}>
        <button
          className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Register
        </button>
      </RecipeInput>
      <div className="flex items-center justify-center">
        Already have account?<Link to="/login" className="text-orange-500 underline">Login</Link>
      </div>
    </form>
  );
}

export default Register;
