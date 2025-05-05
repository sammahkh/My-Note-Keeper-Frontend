import React from "react";
import "./SearchBar.css";

const SearchBar = ({ handleSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="type to search..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
