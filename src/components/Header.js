import React, { useState } from "react";
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
import screenfull from "screenfull";

const Header = ({ dark = false }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

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
      </div>
    </div>
  );
};

export default Header;
