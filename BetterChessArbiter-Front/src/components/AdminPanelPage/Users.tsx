import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { UserModel, roles } from "../../models/UserModel";
import { limit } from "../../constants";
import BgBlur from "../BgBlur";
import SearchComponent from "../SearchComponent";
import UserResult from "./UserResult";
import UserDeleteConfirmation from "./DeleteConfirmation";
import DeleteConfirmation from "./DeleteConfirmation";

function Users() {
  const [allUsers, setAllUsers] = useState<UserModel[] | []>([]);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [userIdToDelete, setUserIdToDelete] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const [from, setFrom] = useState(5);

  const [showOptionsForUserId, setShowOptionsForUserId] = useState<
    string | null
  >(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    const getAll = async () => {
      const res = await axiosPrivate.get("/User");
      setAllUsers(await res.data);
    };
    getAll();
    const getInitial = async () => {
      try {
        const usersCount = await axiosPrivate.get("/User/count");
        setUsersCount(await usersCount.data);
        const res = await axiosPrivate.get("/User/query?limit=5&from=0");
        setUsers(await res.data);
      } catch (error) {
        navigate("/login");
      }
    };
    getInitial();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axiosPrivate.get(
        `/User/query?limit=${limit}&from=${from}`
      );
      console.log(usersCount, hasMore);
      const data = res.data;
      setUsers((prev) => {
        if (prev == null) return data;
        return [...prev, ...data];
      });
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
    if (users!.length >= usersCount) {
      setHasMore(false);
      return;
    }
    setFrom((prev) => prev + 10);
  };

  const handleShowOptions = (userId: string) => {
    if (showOptionsForUserId === userId) {
      console.log(userId);
      setShowOptionsForUserId(null);
      return;
    }
    setShowOptionsForUserId(userId);
  };
  const confirmUserDelete = (userId: string) => {
    setConfirmation(true);
    setUserIdToDelete(userId); // Dodaj tę linię, aby zapamiętać identyfikator użytkownika do usunięcia
  };
  async function handleDelete(confirmed: boolean) {
    if (confirmed == true) {
      try {
        const res = await axiosPrivate.delete(`/User/${userIdToDelete}`);
        console.log(res.data);
        setUsers((prev) => prev!.filter((user) => user.id !== userIdToDelete));
      } catch (err) {
        console.log(err);
      } finally {
        console.log(users);
      }
    }
    setConfirmation(false);
  }

  const handleEdit = async (newRole: roles, user: UserModel) => {
    const newUser: UserModel = { ...user, role: newRole };
    try {
      const res = await axiosPrivate.put(`/User/${user.id}`, newUser);
      if (res.status === 204) {
        setUsers((prev) => {
          return prev!.map((user) => {
            if (user.id === newUser.id) {
              return { ...user, role: newRole };
            }
            return user;
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {users && (
        <>
          <SearchComponent
            data={allUsers}
            handleShowOptions={handleShowOptions}
            showOptionsForUserId={showOptionsForUserId}
            optionsRef={optionsRef}
            handleEdit={handleEdit}
            confirmUserDelete={confirmUserDelete}
          />
          <InfiniteScroll
            dataLength={users!.length} // THIS IS MUST BE THE NUMBER OF WHOLE USERS DATA THAT YOU FETCHED!
            next={getUsers}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p className="text-center"> No more users found</p>}
          >
            {users &&
              users.map((user) => (
                <UserResult
                  user={user}
                  handleShowOptions={handleShowOptions}
                  showOptionsForUserId={showOptionsForUserId}
                  optionsRef={optionsRef}
                  handleEdit={handleEdit}
                  confirmUserDelete={() => confirmUserDelete(user.id)}
                  isSearchResult={false}
                />
              ))}
            {confirmation && (
              <DeleteConfirmation
                handleDelete={handleDelete}
                warningText={
                  "This action is irreversible. Once the user is deleted there is no way to backup their data. The action is"
                }
              />
            )}
            {confirmation && <BgBlur />}
          </InfiniteScroll>
        </>
      )}
    </>
  );
}

export default Users;
