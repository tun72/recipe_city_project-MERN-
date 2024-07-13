import { Link } from "react-router-dom";
import "../index.css";

function Button({ children, color, handelFunction, to }) {
  const colors = {
    red: `bg-red-500 hover:bg-red-700`,
    orange: `bg-orange-500 hover:bg-orange-700`,
    green: `bg-green-500 hover:bg-green-700`,
  };
  let style = "text-white font-bold py-2 px-4 rounded-full " + colors[color];

  if (to) {
    return (
      <Link to={to} className={style}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handelFunction} className={style}>
      {children}
    </button>
  );
}

export default Button;
