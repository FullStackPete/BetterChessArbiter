import Icon from "./Icon";

function Footer() {
  return (
    <div className=" bg-[#EFE5DC] h-min-fit p-4 flex flex-col pb-8">
      <div className="text-center">
        <p className="text-2xl font-semibold mb-4">Better Chess Arbiter</p>
        <p className="font-medium text-lg">BetterChessArbiter sp.z o.o.</p>
        <p className="text-lg">Losowa 14/180</p>
        <p className="text-lg">00-000 Warszawa, Polska</p>
        <div className="flex items-center justify-center text-lg">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Icon Icon="phone" /> <p className="mx-2">099099099</p>
              <Icon Icon="email" />{" "}
              <a href="mailto:psliwa.b@gmail.com" className="mx-2">
                psliwa.b@gmail.com
              </a>
            </div>
            <div className="text-lg font-semibold">
              <a className="fa fa-github"></a>{" "}
              <a href="https://www.github.com/FullStackPete">FullStackPete</a>
            </div>
          </div>
        </div>
        <p className="text-2xl font-medium mt-4">
          Copyright &#169; 2024 BetterChessArbiter. All rights reserved.
        </p>
        <div className="flex flex-col font-semibold mb-4">
          <div className="flex flex-row p-4 justify-between">
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <p>Acceptable Use Policy</p>
        </div>
        <div className="">
          <a href="#" className="fa fa-facebook px-2"></a>
          <a href="" className="fa fa-instagram px-2"></a>
          <a href="" className="fa fa-youtube px-2"></a>
          <a href="" className="fa fa-twitter px-2"></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
