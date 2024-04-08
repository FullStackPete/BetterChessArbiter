import { UserModel, roles } from "../../models/UserModel";
import ManageUserRole from "./ManageUserRole";
import UserDeleteBtn from "./UserDeleteBtn";

type UserResultProps = {
  user: UserModel;
  handleShowOptions: (arg1: string) => void;
  showOptionsForUserId: string | null;
  optionsRef: React.RefObject<HTMLUListElement>;
  handleEdit: (arg1: roles, arg2: UserModel) => Promise<void>;
  confirmUserDelete: (arg1: string) => void;
  isSearchResult: boolean;
};
function UserResult({
  user,
  handleShowOptions,
  showOptionsForUserId,
  optionsRef,
  handleEdit,
  confirmUserDelete,
  isSearchResult,
}: UserResultProps) {
  return (
    <div key={user.id}>
      <div
        className={` rounded-lg text-xl ${
          isSearchResult ? "m-2 my-4 " : "bg-white m-4 p-2"
        }`}
      >
        <div className="flex justify-between items-center ">
          <p className="flex">
            {user.name} {user.surname}
          </p>
          <div className="flex flex-row">
            <p
              className={`flex text-sm font-medium ${
                user.role === "Admin"
                  ? "text-red-400 "
                  : user.role === "Organizer"
                  ? "text-green-400"
                  : user.role === "Moderator"
                  ? "text-blue-400"
                  : ""
              }`}
            >
              {user.role}
            </p>

            <div className="relative flex flex-col">
              <ManageUserRole
                user={user}
                handleShowOptions={handleShowOptions}
                showOptionsForUserId={showOptionsForUserId}
                optionsRef={optionsRef}
                handleEdit={handleEdit}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-gray-500 text-sm">{user.id}</p>
          <UserDeleteBtn confirmDelete={() => confirmUserDelete(user.id)} />
        </div>
      </div>
    </div>
  );
}

export default UserResult;
