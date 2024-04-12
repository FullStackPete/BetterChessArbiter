import AddressBookSection from "../components/UserPage/AddressBookSection";
import FavouritesSection from "../components/UserPage/FavouritesSection";
import UserProfile from "../components/UserPage/UserProfile";

function UserPage() {
  return (
    <div className="mt-16">
      <UserProfile />
      <AddressBookSection />
      <FavouritesSection/>
    </div>
  );
}

export default UserPage;
