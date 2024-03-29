import { useEffect } from "react";
import axios, { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/Auth/refresh", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log(response);
    const newAccessToken = response.data.token;
    console.log(newAccessToken); // Dodaj to logowanie
    setAuth((prev) => {
      return { ...prev, token: response.data.token };
    });
  };

  return refresh;
}

export default useRefreshToken;
