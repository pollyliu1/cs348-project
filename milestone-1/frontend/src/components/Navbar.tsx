import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col fixed top-0 left-0 z-50 w-screen opacity-80">
      <div className="z-30 flex justify-between items-center px-16 py-4">
        <h1
          className="text-4xl text-white font-semibold font-display uppercase mb-1 cursor-pointer"
          onClick={() => nav("/")}
        >
          Adopt-a-mon
        </h1>
        <div className="flex items-center justify-center gap-16 *:text-white *:font-display *:uppercase *:font-medium *:text-lg *:cursor-pointer">
          <h2 onClick={() => nav("/wiki")}>Wiki</h2>
          <h2 onClick={() => nav("/adopt")}>Adopt</h2>
          <h2 onClick={() => nav("/account")}>Account</h2>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
