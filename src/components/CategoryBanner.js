import { MenuItem, Select } from "@material-ui/core";
import React from "react";
// components
import { CategoryItem } from ".";

const CategoryBanner = ({ sort, setSort }) => {
  // list of categories
  const categories = [
    {
      name: "red",
      color: "#FF025E",
    },
    {
      name: "yellow",
      color: "#FFD000",
    },
    {
      name: "green",
      color: "#64f38c",
    },
    {
      name: "blue",
      color: "#019df7",
    },
    {
      name: "black",
      color: "#161a1d",
    },
    {
      name: "white",
      color: "#fff",
    },
  ];

  return (
    <div className="px-3 pt-1 pb-3 w-full flex items-center justify-center flex-wrap">
      {categories.map((category, key) => (
        <CategoryItem key={key} category={category} />
      ))}
      <div className="bg-white dark:bg-[#24292E] rounded-md gradient-shadow ml-2">
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="py-2 px-4 Raleway dark:text-white border border-white dark:border-gray-600 rounded-md"
        >
          <MenuItem value="likes">Most Loved</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="latest">Latest</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default CategoryBanner;
