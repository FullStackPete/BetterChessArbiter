import { ChangeEvent } from "react";
import Icon from "./Icon";
import { UserModel, roles } from "../models/UserModel";
import useSearch from "../hooks/useSearch";
import UserResult from "./AdminPanelPage/UserResult";

type SearchComponentProps = {
  data: UserModel[] | [];
  handleShowOptions: (arg1: string) => void;
  showOptionsForUserId: string | null;
  optionsRef: React.RefObject<HTMLUListElement>;
  handleEdit: (arg1: roles, arg2: UserModel) => Promise<void>;
  confirmUserDelete: (arg1: string) => void;
};
function SearchComponent({
  data,
  handleShowOptions,
  showOptionsForUserId,
  optionsRef,
  handleEdit,
  confirmUserDelete,
}: SearchComponentProps) {
  const { searchResults, input, handleSearch } = useSearch(data);
  return (
    <div className="flex justify-center">
      <div className="flex items-center flex-col relative p-4 bg-white rounded-xl">
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
          value={input}
          placeholder=""
          className="search-input rounded-md border-2 border-[#EFE5DC] text-xl pl-8 transform duration-300 w-56"
          type="text"
        />
        <Icon
          className="absolute bg-white top-5 z-10  text-md transform duration-300 search-icon -translate-x-24"
          Icon="search"
        />
        {searchResults && (
          <div className="search-result hidden mt-4 p-4 rounded-md text-base min-h-screen">
            {searchResults.length > 0 ? (
              <p className="text-lg font-semibold border-b">Results:</p>
            ) : (
              <p className="text-lg font-semibold text-center border-b">
                No results found
              </p>
            )}
            {searchResults.map((user: UserModel) => {
              return (
                <UserResult
                  user={user}
                  handleShowOptions={handleShowOptions}
                  showOptionsForUserId={showOptionsForUserId}
                  optionsRef={optionsRef}
                  handleEdit={handleEdit}
                  confirmUserDelete={confirmUserDelete}
                  isSearchResult={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
