import { Button } from "@material-ui/core";
import { FormatColorFill } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  let history = useHistory();

  const gotoGenerator = () => {
    history.push("/gradient_generator");
  };

  const gotoHome = () => {
    history.push("/");
  };

  return (
    <div className="header flex">
      <div className="logo" onClick={gotoHome}>
        <h1>Gradient King</h1>
      </div>
      <Search />
      <Button onClick={gotoGenerator} className="navlink">
        <FormatColorFill />
      </Button>
    </div>
  );
};

export default Header;
