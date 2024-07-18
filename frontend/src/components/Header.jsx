import { Link } from "react-router-dom";
import Logout from "./Auth/Logout";
import { useAuthContext } from "../context/AuthContext";
export default function Header() {
  const { user } = useAuthContext();

  return (
    <header className="flex fixed top-0 lg:top-[0.5rem] left-0 w-full flex-wrap lg:left-[50%] lg:w-[82%] lg:rounded-[20rem] lg:translate-x-[-50%]  z-[222] items-center py-3 justify-between px-10 bg-white/10 shadow-md border border-gray-200 backdrop-blur-sm backdrop-filter">
      <h1 className="font-bold text-xl lg:text-3xl">
        <Link to="/">
          Recipe <span className="text-orange-500">Town</span>
        </Link>
      </h1>

      <nav>
        <ul className="flex items-center gap-2 lg:gap-5 font-bold text-gray-500 text-sm lg:text-base">
          <li>
            <Link to="/new-recipe">New Recipes</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/register" className="hover:text-orange-500">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-500">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {user.name}
              </li>
              <li>
                <Logout />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
