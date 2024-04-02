import { useState } from "react";
import Icon from "./Icon";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useDecode from "../hooks/useDecode";

function Sidebar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showBar, setShowBar] = useState(false);
  const user = useDecode();
  function handleNavigate(to: string) {
    setShowBar(!showBar);
    navigate(to);
  }

  return (
    <>
      <Icon
        Icon={`${showBar ? "close" : "menu"}`}
        className={`absolute top-2 z-40 right-4 text-3xl cursor-pointer transition-transform ${
          showBar ? "rotate-180" : ""
        }`}
        onClick={() => setShowBar(!showBar)}
      />
      {showBar && (
        <div className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50"></div>
      )}
      <div
        className={`transition-transform ${
          showBar ? "translate-x-0" : "translate-x-full"
        } top-0 -right-1 absolute w-[70vw] h-screen bg-[#EFE5DC] z-30`}
      >
        <ul className="text-2xl flex flex-col items-center justify-center mt-16 sidebar">
          {!auth?.role && (
            <>
              <li
                onClick={() => {
                  handleNavigate("/register");
                }}
              >
                Sign up
              </li>
              <li
                onClick={() => {
                  handleNavigate("/login");
                }}
              >
                Log in
              </li>
            </>
          )}
          {auth?.role && user && (
            <li
              onClick={() => {
                handleNavigate(`/user/${user.nameid}`);
              }}
            >
              Your account
            </li>
          )}
          {auth?.role == "Admin" && (
            <li onClick={() => handleNavigate("/adminpanel")}>Admin panel</li>
          )}
          {auth?.role && (
            <li
              onClick={() => {
                handleNavigate("/favouritetournaments");
              }}
            >
              Your favourites
            </li>
          )}
          <li>Search tournaments</li>
          {auth?.role && <li>Organize tournament</li>}
          {auth?.role == "Moderator" ||
            ("Admin" && (
              <li
                onClick={() => {
                  handleNavigate("/verifytournaments");
                }}
              >
                Verify tournaments
              </li>
            ))}
          <li>About us</li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
