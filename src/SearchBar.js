import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <input
      className="search_bar"
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="search by campaign name"
    />
  );
};

export default SearchBar;
