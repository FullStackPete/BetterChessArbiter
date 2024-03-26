import Icon from "./Icon";

function Navbar() {
  return (
    <div>
      <div className="fixed z-30 top-0 w-screen bg-[#D0B8AC]">
        <div className="m-2 mx-4 flex flex-row justify-between items-center">
          <a href="/" className="flex flex-row items-center">
            <Icon Icon="chess" className="font-medium" />
            <p className="text-xl font-bold mx-2">BetterChessArbiter</p>
          </a>
          <Icon Icon="menu" className="text-3xl" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
