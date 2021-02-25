import { Button, Tooltip } from "@material-ui/core";
import {
  AddToPhotos,
  Brightness4,
  FormatColorFill,
  RotateRight,
} from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import Search from "./Search";

const Header = ({ rotate, changeMode }) => {
  let history = useHistory();

  const gotoGenerator = () => {
    history.push("/gradient_generator");
  };

  const gotoHome = () => {
    history.push("/");
  };
  const gototGithub = () => {
    window.open("https://github.com/saviomartin/gradientking#-contributing");
  };

  return (
    <div className="header flex">
      <div className="logo flex" onClick={gotoHome}>
        <h1>Gradient King</h1>
      </div>
      <div className="rightBtns flex">
        <Tooltip title="Search" aria-label="add">
          <Search />
        </Tooltip>
        <Tooltip title="Rotate" aria-label="add">
          <Button onClick={rotate} className="navbtns rotateBtn">
            <RotateRight />
          </Button>
        </Tooltip>
        <Tooltip title="Rotate" aria-label="add">
          <Button onClick={gototGithub} className="navbtns addBtn">
            <AddToPhotos />
          </Button>
        </Tooltip>
        <Tooltip title="Dark Mode" aria-label="add">
          <Button onClick={changeMode} className="navbtns">
            <Brightness4 />
          </Button>
        </Tooltip>
        <Tooltip title="Gradient Generator" aria-label="add">
          <Button onClick={gotoGenerator} className="navbtns">
            <FormatColorFill />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
