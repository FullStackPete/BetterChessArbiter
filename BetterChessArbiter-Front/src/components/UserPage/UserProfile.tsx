import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserModel } from "../../models/UserModel";
import useDecode from "../../hooks/useDecode";
import { useNavigate } from "react-router-dom";

type decodedUserToken = {
  aud: string;
  email: string;
  exp: number;
  family_name: string;
  gender: string;
  given_name: string;
  iat: number;
  iss: string;
  nameid: string;
  nbf: number;
  role: "User" | "Moderator" | "Organizer" | "Admin";
};

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>();
  const axiosPrivate = useAxiosPrivate();
  const userInfo = useDecode<decodedUserToken>();
  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();
    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get(`/User/${userInfo?.nameid}`, {
          // signal: controller.signal,
        });

        console.log(res.data);
        isMounted && setUser(res.data);
      } catch (error: unknown) {
        console.log(error);
        navigate("/login");
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);
  return <>{user && <div>{user.name}</div>}</>;
}

export default UserProfile;
