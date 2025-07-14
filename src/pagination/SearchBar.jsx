// components/SearchBar.jsx
import React from "react";

const SearchBar = ({ placeholder, searchText, setSearchText }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="input input-bordered border w-full md:w-1/3 mb-4"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchBar;
