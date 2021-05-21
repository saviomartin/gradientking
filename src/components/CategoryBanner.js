import React from "react";

const CategoryBanner = () => {
  const categories = [
    {
      name: "red",
      color: "#e5383b",
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
        <div
          className="h-10 w-[11%] p-1 gradient-shadow rounded-md flex items-center justify-center mx-1"
          key={key}
          style={{ background: category.color }}
        >
          <h3
            className={`text-md font-bold capitalize Raleway ${
              category.name === "white" ? "text-[#000]" : "text-white"
            }`}
          >
            {category.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryBanner;
