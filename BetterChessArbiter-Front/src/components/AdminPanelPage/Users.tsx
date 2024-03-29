import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get("/User", {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounted && setUsers(res.data);
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
  return <>{users && users.map((user) => <div>{user.name}</div>)}</>;
}

export default Users;
