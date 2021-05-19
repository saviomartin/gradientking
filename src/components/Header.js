import React, { useEffect, useState } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// material design
import { Button, TextField, Tooltip } from "@material-ui/core";

import Icon from "./Icon"; // logo icon

// Icons
import {
  BsArrowsFullscreen,
  BsBookmarkCheck,
  BsBrightnessHigh,
  BsFullscreenExit,
  BsLightning,
  BsPlusSquare,
} from "react-icons/bs";
import { GrRotateRight } from "react-icons/gr";
import { IoMoonOutline } from "react-icons/io5";
import { FiGithub, FiLogOut } from "react-icons/fi";

// full screen
import screenfull from "screenfull";

import axios from "axios"; // axios

const Header = ({
  dark = true,
  signInWithGoogle,
  signout,
  user,
  align,
  setAlign,
  searchText,
  setSearchText,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [starCount, setStarCount] = useState(1);

  const fetchStarCount = () => {
    axios
      .get("https://api.github.com/repos/saviomartin/gradientking", {
        headers: {},
      })
      .then((response) => {
        setStarCount(response.data.stargazers_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // rotate
  const rotate = () => {
    if (align === "left") {
      setAlign("right");
    } else if (align === "right") {
      setAlign("top");
    } else if (align === "top") {
      setAlign("bottom");
    } else {
      setAlign("left");
    }
  };

  // fetch on load once
  useEffect(() => {
    fetchStarCount();
  }, []);

  // const [scrolled, setScrolled] = useState(false);

  // const handleScroll = () => {
  //   const offset = window.scrollY;
  //   if (offset > 40) {
  //     console.log("scrolled");
  //     setScrolled(true);
  //   } else {
  //     console.log("top");
  //     setScrolled(false);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // });

  return (
    <header
      className={`pl-4 pr-2 py-2 flex items-center justify-between fixed top-0 left-0 w-full z-10  frosted-nav`}
    >
      <Link to="/">
        <div className="flex items-center justify-center">
          <Icon />
          <h1 className="logo Raleway font-extrabold text-3xl ml-2">
            Gradient King
          </h1>
        </div>
      </Link>
      <div className="flex items-center justify-center h-full">
        <TextField
          label="Search Colors"
          variant="filled"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Tooltip title="Generator">
          <div className="w-10 overflow-hidden flex items-center justify-center rounded-md">
            <Button className="btn">
              <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                {dark ? (
                  <BsBrightnessHigh className="text-[1.57rem] text-[#222]" />
                ) : (
                  <IoMoonOutline
                    className="text-[1.6rem] text-[#222]"
                    style={{ transform: "rotate(15deg)" }}
                  />
                )}
              </div>
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="Rotate Gradient">
          <div
            className="w-10 overflow-hidden flex items-center justify-center rounded-md"
            onClick={rotate}
          >
            <Button className="btn">
              <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                <GrRotateRight className="text-[1.57rem] text-[#222]" />
              </div>
            </Button>
          </div>
        </Tooltip>
        <Link to="/generate" className="flex items-center">
          <Tooltip title="Gradient Generator">
            <div className="w-10 overflow-hidden flex items-center justify-center rounded-md">
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <BsLightning className="text-[1.57rem] text-[#222]" />
                </div>
              </Button>
            </div>
          </Tooltip>
        </Link>
        <Link to="/saved" className="flex items-center">
          <Tooltip title="Saved Gradients">
            <div className="w-10 overflow-hidden flex items-center justify-center rounded-md">
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <BsBookmarkCheck className="text-[1.57rem] text-[#222]" />
                </div>
              </Button>
            </div>
          </Tooltip>
        </Link>
        <Tooltip title="Add New Gradient">
          <a
            href="https://github.com/saviomartin/gradientking"
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-10 overflow-hidden flex items-center justify-center rounded-md">
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <BsPlusSquare className="text-[1.45rem] text-[#222]" />
                </div>
              </Button>
            </div>
          </a>
        </Tooltip>
        <Tooltip title="Toogle FullScreen">
          <div
            className="w-10 overflow-hidden flex items-center justify-center rounded-md"
            onClick={() => {
              setIsFullScreen(!isFullScreen);
              screenfull.toggle();
            }}
          >
            <Button className="btn">
              <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                {isFullScreen ? (
                  <BsFullscreenExit className=" text-[1.5rem] text-[#111]" />
                ) : (
                  <BsArrowsFullscreen className=" text-[1.5rem] text-[#111]" />
                )}
              </div>
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="Star On Github">
          <a
            href="https://github.com/saviomartin/gradientking"
            target="_blank"
            rel="noreferrer"
            className="ml-1 items-center bg-[#24292E] hover:bg-[#222] rounded-md relative py-1"
          >
            <Button className="track flex twitterBtn">
              <div className="flex items-center justify-center text-sm capitalize text-[#F0E9E2] duration-300">
                Stars {starCount}
                <FiGithub className="ml-1" />
              </div>
            </Button>
          </a>
        </Tooltip>
        <Tooltip title="Buy Me A Coffee">
          <a
            href="https://buymeacoffee.com/saviomartin"
            target="_blank"
            rel="noreferrer"
            className="ml-1 items-center bg-[#24292E] hover:bg-[#222] rounded-md relative cursor-pointer flex"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              className="h-[42px]"
              alt="Buy Me A Coffee"
            />
          </a>
        </Tooltip>
        {user ? (
          <Tooltip title="Sign In With Google">
            <div
              className="ml-1 items-center bg-[#fff] hover:bg-[#eee] border border-[#ddd] rounded-md relative py-1"
              onClick={signout}
            >
              <Button className="track flex twitterBtn">
                <div className="flex items-center justify-center text-sm capitalize text-[#111] duration-300">
                  {user.displayName}
                  <img
                    width="26px"
                    className="ml-2 rounded-md"
                    alt="Google sign-in"
                    src={user.photoURL}
                  />
                  <FiLogOut className="text-xl ml-1" />
                </div>
              </Button>
            </div>
          </Tooltip>
        ) : (
          <Tooltip title="Sign In With Google">
            <div
              className="ml-1 items-center bg-[#fff] hover:bg-[#eee] border border-[#ddd] rounded-md relative py-1"
              onClick={signInWithGoogle}
            >
              <Button className="track flex twitterBtn">
                <div className="flex items-center justify-center text-sm capitalize text-[#111] duration-300">
                  Sign In
                  <img
                    width="20px"
                    className="ml-2"
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                </div>
              </Button>
            </div>
          </Tooltip>
        )}
      </div>
    </header>
  );
};

export default Header;
