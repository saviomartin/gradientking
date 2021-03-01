import { Button } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const Notfound = () => {
  const history = useHistory();
  return (
    <div className="notFound flex">
      <div className="box">
        <h1>404</h1>
        <h2>Looks like you're lost. Go back home</h2>
        <Button
          className="flex"
          className="goHomebtn"
          onClick={() => history.push("/")}
        >
          Go Back Home <Home />
        </Button>
      </div>
    </div>
  );
};

export default Notfound;
