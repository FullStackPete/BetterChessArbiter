import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserModel } from "../../models/UserModel";
import useDecode from "../../hooks/useDecode";
import { useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";

export type decodedUserToken = {
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
  const userInfo = useDecode();
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
  return <>{user && <div className="flex flex-col justify-center bg-white m-4 p-2 rounded-lg">
    <div className="flex flex-col"> 
    <p className="font-semibold m-4 text-3xl">Good to see you {user.name}!</p>
    <p className="text-lg font-medium mx-4"> What are you up to?</p>
    <UserOptions/>
    </div>

    </div>}</>;
}

export default UserProfile;
