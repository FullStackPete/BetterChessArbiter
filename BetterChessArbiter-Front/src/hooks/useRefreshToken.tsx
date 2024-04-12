import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import { AuthType } from "../context/AuthProvider";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/Auth/refresh", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });
    const newAccessToken: string = response.data.token;
    const newDecodedToken = jwtDecode(newAccessToken);
    setAuth((prev: AuthType | undefined) => {
      if (!prev) {
        throw new Error("No previous auth state specified"); // Return undefined if previous state is undefined
      }
      return { ...prev, token: newAccessToken, decodedToken: newDecodedToken };
    });

    return newAccessToken;
  };

  return refresh;
}

export default useRefreshToken;
