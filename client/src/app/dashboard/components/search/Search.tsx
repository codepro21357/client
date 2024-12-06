import React from "react";

interface ISearchProps {
  handleSearch: (value: string) => void;
}

const Search = ({ handleSearch }: ISearchProps) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Filter"
        className="w-full px-5 py-2 rounded-md border-[1px] border-solid border-gray-400"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
