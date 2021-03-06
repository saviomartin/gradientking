import React from "react";

const Search = () => {
  const findSearchWord = (e) => {
    if (e.keyCode === 13) {
      window.find(e.target.value);
    }
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for a Color or Gradient name"
        className="input"
        onKeyDown={(e) => findSearchWord(e)}
      />
    </div>
  );
};

export default Search;
