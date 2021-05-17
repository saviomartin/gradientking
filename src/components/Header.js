import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// material design
import { Button, Tooltip } from "@material-ui/core";

// Icon
import Icon from "./Icon";
import {
  BsArrowsFullscreen,
  BsBookmarkCheck,
  BsBrightnessHigh,
  BsFullscreenExit,
  BsLightning,
} from "react-icons/bs";
import { GrRotateRight } from "react-icons/gr";
import { IoMoonOutline } from "react-icons/io5";
import { FiGithub, FiTwitter } from "react-icons/fi";
import screenfull from "screenfull";
import axios from "axios";

const Header = ({ dark = false }) => {
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

  const twitterLink =
    "https://twitter.com/intent/tweet?text=Check%20out%20loficlub.now.sh%20by%20@SavioMartin7%E2%9A%A1%EF%B8%8F%0D%0A%0AThe%20best%20place%20to%20enjoy%20Hip%20hop%20beats%20to%20Relax%20or%20Study!%20%F0%9F%8E%A7%20Give%20it%20a%20try!%20You%27ll%20love%20it!%20%F0%9F%94%A5%0D%0A%0A%23lofi%20%23chillbeats";

  // fetch on load once
  useEffect(() => {
    fetchStarCount();
  }, []);

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center justify-center">
        <Icon />
        <h1 className="logo Raleway font-extrabold text-3xl ml-2">
          Gradient King
        </h1>
      </div>
      <div className="flex items-center justify-center h-full">
        <Link to="/generate" className="flex items-center">
          <Tooltip title="Generator" arrow>
            <div className="w-12 overflow-hidden flex items-center justify-center rounded-md">
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  {dark ? (
                    <BsBrightnessHigh className="text-[1.7rem] text-[#222]" />
                  ) : (
                    <IoMoonOutline
                      className="text-[1.8rem] text-[#222]"
                      style={{ transform: "rotate(15deg)" }}
                    />
                  )}
                </div>
              </Button>
            </div>
          </Tooltip>
        </Link>
        <Link to="/generate" className="flex items-center">
          <Tooltip title="Generator" arrow>
            <div className="w-12 overflow-hidden flex items-center justify-center rounded-md">
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <GrRotateRight className="text-[1.7rem] text-[#222]" />
                </div>
              </Button>
            </div>
          </Tooltip>
        </Link>
        <Link to="/generate" className="flex items-center">
          <Tooltip title="Generator" arrow>
            <div className="w-12 overflow-hidden flex items-center justify-center rounded-md">
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <BsLightning className="text-[1.7rem] text-[#222]" />
                </div>
              </Button>
            </div>
          </Tooltip>
        </Link>
        <Link to="/generate" className="flex items-center">
          <Tooltip title="Generator" arrow>
            <div className="w-12 overflow-hidden flex items-center justify-center rounded-md">
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  <BsBookmarkCheck className="text-[1.7rem] text-[#222]" />
                </div>
              </Button>
            </div>
          </Tooltip>
        </Link>
        <Link to="/generate" className="flex items-center">
          <Tooltip title="Generator" arrow>
            <div
              className="w-12 overflow-hidden flex items-center justify-center rounded-md"
              onClick={() => {
                setIsFullScreen(!isFullScreen);
                screenfull.toggle();
              }}
            >
              <Button className="btn">
                <div className="w-full h-12 flex items-center justify-center overflow-hidden">
                  {isFullScreen ? (
                    <BsFullscreenExit className=" text-2xl text-[#111]" />
                  ) : (
                    <BsArrowsFullscreen className=" text-2xl text-[#111]" />
                  )}
                </div>
              </Button>
            </div>
          </Tooltip>
        </Link>
        <Tooltip title="Share to Twitter" arrow>
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
        <Tooltip title="Buy Me A Coffee" arrow>
          <a
            href="https://buymeacoffee.com/saviomartin"
            target="_blank"
            rel="noreferrer"
            className="ml-1 items-center bg-[#24292E] hover:bg-[#222] rounded-md relative cursor-pointer hidden lg:flex"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              className="h-[42px]"
              alt="Buy Me A Coffee"
            />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
