import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

function useAuth() {
  const auth = useContext(AuthContext);
  if(!auth){
    throw new Error("Context must be used within provider!")
  }
  return auth;
}

export default useAuth;
