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
import Icon from "./Icon";
import useLocalStorage from "../hooks/useLocalStorage";

const clientId =
  "121772990060-n4vkt1p76epmjdmk4o0uptpq4jiekkld.apps.googleusercontent.com";

const Header = ({ rotate, changeMode }) => {
  //guest avatars
  const avatars = [
    "https://avataaars.io/?avatarStyle=Circle&accessoriesType=Round&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light",
    "https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Sunglasses&hatColor=Red&clotheType=ShirtScoopNeck&clotheColor=Blue02&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light",
    "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Wayfarers&hatColor=Blue02&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Blue03&graphicType=Deer&eyeType=Close&eyebrowType=SadConcerned&mouthType=Smile&skinColor=Light",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairBigHair&accessoriesType=Prescription01&hairColor=Brown&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=Happy&eyebrowType=FlatNatural&mouthType=Smile&skinColor=Light",
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Sunglasses&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelYellow&eyeType=Happy&eyebrowType=FlatNatural&mouthType=Smile&skinColor=Light",
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light",
    "https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Wayfarers&hairColor=Auburn&facialHairType=Blank&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=UpDown&mouthType=Default&skinColor=Pale",
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=Brown&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Cry&eyebrowType=SadConcernedNatural&mouthType=Smile&skinColor=Light",
  ];

  const guestAvatar = avatars[Math.floor(Math.random() * avatars.length)];

  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [guestName, setGuestName] = useState("Guest User");
  const [guestProfilePic, setGuestProfilePic] = useLocalStorage(
    "avatar:",
    guestAvatar
  );

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
        <Icon />
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
            <>
              <img src={guestProfilePic} alt={guestName} />
              <div className="profileComp">
                <h4>{guestName}</h4>
                <Button onClick={signIn}>Sign in with Google</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
