import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="pt-[4.5rem] pb-[4rem] max-w-[76rem] mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default App;
