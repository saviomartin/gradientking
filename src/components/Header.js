import { Button, Tooltip } from "@material-ui/core";
import {
  AddToPhotos,
  Brightness4,
  FormatColorFill,
  RotateRight,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useGoogleLogin } from "react-google-login";
import { useGoogleLogout } from "react-google-login";

// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "121772990060-n4vkt1p76epmjdmk4o0uptpq4jiekkld.apps.googleusercontent.com";

const Header = ({ rotate, changeMode }) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // login
  const onSuccess = (res) => {
    setName(res.profileObj.name);
    setProfilePic(res.profileObj.imageUrl);

    console.log(res);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  // logout
  const onLogoutSuccess = (res) => {
    setName("");
    setProfilePic("");

    console.log("Logged out Success");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

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
        <Tooltip title="Add Gradient" aria-label="add">
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
        <div className="profile flex">
          {name ? (
            <>
              <img src={profilePic} alt={name} />
              <div className="profileComp">
                <h4>{name}</h4>
                <Button onClick={signOut}>Sign out</Button>
              </div>
            </>
          ) : (
            <Button onClick={signIn}>Sign in with Google</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
