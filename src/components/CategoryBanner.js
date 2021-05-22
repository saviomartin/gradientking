import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
} from "@material-ui/core";
import React from "react";
import InputBase from "@material-ui/core/InputBase";
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

  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "12px 26px 12px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }))(InputBase);

  return (
    <div className="px-3 pt-1 pb-3 w-full flex items-center justify-center flex-wrap">
      {categories.map((category, key) => (
        <CategoryItem key={key} category={category} />
      ))}
      <div className="bg-white rounded-md gradient-shadow ml-2">
        <Select
          value={sort}
          input={<BootstrapInput />}
          onChange={(e) => setSort(e.target.value)}
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
