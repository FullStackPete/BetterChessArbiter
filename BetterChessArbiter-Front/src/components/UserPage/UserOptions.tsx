import { roles } from "../../constants";
import useAuth from "../../hooks/useAuth";
import OptionTemplate from "./OptionTemplate";

function UserOptions() {
  const { auth } = useAuth();

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row">
        <OptionTemplate
          topText="Addresses"
          description="Click here to manage your address!"
          iconName="book_3"
        />
        <OptionTemplate
          topText="Favourites"
          description="See your favourite tournaments!"
          iconName="star"
        />
      </div>
      <div className="flex flex-row">
        {auth?.role == roles.admin && (
          <OptionTemplate
            topText={"Admin panel"}
            description={"Manage all users now!"}
            iconName={"manage_accounts"}
          />
        )}
        {(auth?.role == roles.admin || auth?.role == roles.moderator) && (
            <OptionTemplate
              topText={"Verify tournaments"}
              description={"Click here to verify and manage new tournaments!"}
              iconName={"verified_user"}
            />
          )}
      </div>
    </div>
  );
}

export default UserOptions;
