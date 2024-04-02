import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import Sidebar from "./Sidebar";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="fixed z-30 top-0 w-screen bg-[#D0B8AC]">
      <div className="m-2 mx-4 flex flex-row justify-between items-center">
        <a onClick={() => navigate("/")} className="flex flex-row items-center">
          <Icon Icon="chess" className="font-medium text-3xl" />
          <p className="text-xl font-bold mx-2">BetterChessArbiter</p>
        </a>
        <Sidebar />
      </div>
    </div>
  );
}

export default Navbar;
