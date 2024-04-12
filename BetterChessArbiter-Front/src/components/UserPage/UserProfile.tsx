import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserModel } from "../../models/UserModel";
import { useNavigate } from "react-router-dom";
import UserOptions from "./UserOptions";
import SectionContainer from "./SectionContainer";



function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();
    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get(`/User/one`);
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

  return (
    <>
      {user && (
        <SectionContainer background={"#FFFFFF"}>
          <div className="flex flex-col">
            <p className="font-semibold m-4 text-3xl">
              Good to see you {user.name}!
            </p>
            <p className="text-lg font-medium mx-4"> What are you up to?</p>
            <UserOptions />
          </div>
        </SectionContainer>
      )}
    </>
  );
}

export default UserProfile;
