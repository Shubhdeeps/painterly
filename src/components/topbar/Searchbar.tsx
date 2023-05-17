import { useRouter } from "next/router";
import React, { useState } from "react";
import SearchIcon from "../../assets/icons/Search.icon";

export default function Searchbar({
  setSideBarFlex,
}: {
  setSideBarFlex: Function | undefined;
}) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode == 13) {
      setSearchText("");
      if (!!searchText) {
        router.replace(`/search/${searchText}`);
      }
      if (setSideBarFlex) {
        setSideBarFlex(false);
      }
    }
  };
  return (
    <div className="primary-border border-radius-50 search-bar d-flex align-items-center ps-3 pe-3">
      <SearchIcon />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
        className="input-search-field ps-2"
        type="search"
        placeholder="search usernames"
      />
    </div>
  );
}
