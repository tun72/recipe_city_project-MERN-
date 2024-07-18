import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { URL } from "../utils/constant";

const AuthContext = createContext();

const initialState = {
  user: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload };
    case "logout":
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
}
export function AuthProvider({ children }) {
  const [{ user }, dispatch] = useReducer(reducer, initialState);

  console.log("hit context");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(URL + "/api/auth/me", {
          withCredentials: true,
        });

        let user = response.data.user;

        if (user) {
          dispatch({ type: "login", payload: user });
        } else {
          dispatch({ type: "logout" });
        }
      } catch (e) {
        dispatch({ type: "logout" });
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === null)
    throw new Error("Auth context is used outside of components.");

  return context;
}
