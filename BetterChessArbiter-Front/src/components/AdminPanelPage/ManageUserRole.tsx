import { UserModel, roles } from "../../models/UserModel";
import Icon from "../Icon";
type ManageUserRoleProps = {
  user: UserModel;
  handleShowOptions: (arg1: string) => void;
  showOptionsForUserId: string | null;
  optionsRef: React.RefObject<HTMLUListElement>;
  handleEdit: (arg1: roles, arg2: UserModel) => void;
};

function ManageUserRole({
  user,
  handleShowOptions,
  showOptionsForUserId,
  optionsRef,
  handleEdit,
}: ManageUserRoleProps) {
  return (
    <>
      <Icon
        onClick={() => handleShowOptions(user.id)}
        className={`ml-4 text-black transition-all ${
          showOptionsForUserId === user.id ? "rotate-90" : ""
        }`}
        Icon="more_horiz"
      />
      <>
        <ul
          className={`${
            showOptionsForUserId === user.id
              ? "h-[6.5rem] p-2 border border-[#d6d6d6]"
              : "h-0 p-0"
          } admin-options transition-[height] text-black leading-7 bg-[#FEFEFE]   shadow-2xl text-sm font-medium w-max rounded-md absolute top-6 right-6 overflow-hidden`}
          ref={optionsRef}
        >
          {showOptionsForUserId === user.id && user.role == "Admin" && (
            <>
              <li onClick={() => handleEdit("User", user)}>Demote to User</li>
              <li onClick={() => handleEdit("Organizer", user)}>
                Demote to Organizer
              </li>
              <li onClick={() => handleEdit("Moderator", user)}>
                Demote to Moderator
              </li>
            </>
          )}
          {showOptionsForUserId === user.id && user.role == "Moderator" && (
            <>
              <li onClick={() => handleEdit("Admin", user)}>
                Promote to Admin
              </li>
              <li onClick={() => handleEdit("Organizer", user)}>
                Demote to Organizer
              </li>
              <li onClick={() => handleEdit("User", user)}>Demote to User</li>
            </>
          )}
          {showOptionsForUserId === user.id && user.role == "Organizer" && (
            <>
              <li onClick={() => handleEdit("Moderator", user)}>
                Promote to Moderator
              </li>
              <li onClick={() => handleEdit("Admin", user)}>
                Promote to Admin
              </li>
              <li onClick={() => handleEdit("User", user)}>Demote to User</li>
            </>
          )}
          {showOptionsForUserId === user.id && user.role == "User" && (
            <>
              <li onClick={() => handleEdit("Moderator", user)}>
                Promote to Moderator
              </li>
              <li onClick={() => handleEdit("Organizer", user)}>
                Promote to Organizer
              </li>
              <li onClick={() => handleEdit("Admin", user)}>
                Promote to Admin
              </li>
            </>
          )}
        </ul>
      </>
    </>
  );
}

export default ManageUserRole;
