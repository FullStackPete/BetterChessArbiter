import { useNavigate } from "react-router-dom";
import { roles } from "../../constants";
import useAuth from "../../hooks/useAuth";
import TileTemplate from "./TileTemplate";

function UserOptions() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row">
        <TileTemplate
          topText="Address book"
          description="Click here to manage your addresses!"
          iconName="book_3"
          bg={"#F3D8C7"}
          href={"#address-book"}
          isOption={true}
        />
        <TileTemplate
          topText="Favourites"
          description="See your favourite tournaments!"
          iconName="star"
          bg={"#EFE5DC"}
          href={"#favourites"}
          isOption={true}
        />
      </div>
      <div className="flex flex-row">
        {auth?.role == roles.admin && (
          <TileTemplate
            topText={"Admin panel"}
            description={"Manage all users and their roles now!"}
            iconName={"manage_accounts"}
            bg={"#FBFEFB"}
            onClickFn={() => navigate("/adminpanel")}
            isOption={true}
          />
        )}
        {(auth?.role == roles.admin || auth?.role == roles.moderator) && (
          <TileTemplate
            topText={"Verify tournaments"}
            description={"Click here to verify and manage new tournaments!"}
            iconName={"verified_user"}
            bg={"#FFFFFF"}
            onClickFn={() => navigate("/verifytournaments")}
            isOption={true}
          />
        )}
      </div>
    </div>
  );
}

export default UserOptions;
