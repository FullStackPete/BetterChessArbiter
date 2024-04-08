import { useState, ChangeEvent } from "react";

function useSearch(data: any[]) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [input, setInput] = useState<string>();

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setInput(inputValue);
    const results = data.filter((item) =>
      Object.entries(item).some(
        ([key, value]) =>
          ["name", "surname", "id"].includes(key) &&
          typeof value === "string" &&
          value
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(inputValue.toLowerCase().replace(/\s/g, ""))
      )
    );
    setSearchResults(results);
    console.log(results);
  }
  return { searchResults, input, handleSearch };
}

export default useSearch;
