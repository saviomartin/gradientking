import React from "react";

// react router dom
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link
      to={`/category/${category.name}`}
      className="h-10 w-20 lg:w-[11%] p-1 gradient-shadow rounded-md flex items-center justify-center mx-1"
      style={{ background: category.color }}
    >
      <h3
        className={`text-md font-bold capitalize Raleway ${
          category.name === "white" ? "text-[#000]" : "text-white"
        }`}
      >
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryItem;
