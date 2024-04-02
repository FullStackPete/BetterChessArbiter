import { jwtDecode, JwtPayload } from "jwt-decode";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";
function useDecode() {
  const { auth } = useAuth();
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
  useEffect(() => {
    const decode = async () => {
      try {
        const token = auth?.token;
        if (token) {
          const decoded = jwtDecode(token);
          console.log(decoded)
          setDecodedToken(decoded);
        }
      } catch (err) {
        console.log("Error decoding:", err);
      }
    };

    decode();
  }, [auth]);
  return decodedToken;
}

export default useDecode;
