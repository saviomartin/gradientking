import React from "react";
import { CategoryItem } from ".";

const CategoryBanner = () => {
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
    </div>
  );
};

export default CategoryBanner;
