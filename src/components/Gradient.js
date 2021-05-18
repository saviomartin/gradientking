import { Button, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  BsBookmarkCheck,
  BsBookmarkPlus,
  BsClipboard,
  BsCode,
  BsHeart,
} from "react-icons/bs";

const Gradient = ({ gradient }) => {
  const [showCopyBg, setShowCopyBg] = useState(false);
  const [showSaveBg, setShowSaveBg] = useState(false);

  // css code
  const CSS = `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]});`;

  // copy css func
  const copyCSS = () => {
    // clipboard api
    navigator.clipboard.writeText(CSS);

    toast.success("Copied to clipboard!"); // toaster

    setShowCopyBg(true); //ui change
    setTimeout(() => {
      setShowCopyBg(false);
    }, [1000]);
  };

  //TODO: Save Gradient
  const saveGradient = () => {
    setShowSaveBg(true); //ui change
    setTimeout(() => {
      setShowSaveBg(false);
    }, [1000]);
  };

  return (
    <div className="p-4 gradient-shadow bg-white m-3 rounded-md transition duration-400 cursor-pointer text-[#222]">
      <div
        className="h-[200px] w-[280px] rounded-md flex items-start justify-end p-2 relative overflow-hidden"
        style={{
          background: `linear-gradient(to right, ${gradient.colors[0]}, ${gradient.colors[1]})`,
        }}
      >
        {showCopyBg && (
          <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center">
            <div className="w-[92.5%] h-[92.5%] frosted-nav rounded-md flex items-center justify-center flex-col">
              <BsClipboard className="text-3xl text-[#111]" />
              <h3 className="text-[#111] mt-2">Copied CSS</h3>
            </div>
          </div>
        )}

        {showSaveBg && (
          <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center">
            <div className="w-[92.5%] h-[92.5%] frosted-nav rounded-md flex items-center justify-center flex-col">
              <BsBookmarkCheck className="text-3xl text-[#111]" />
              <h3 className="text-[#111] mt-2">Saved Gradient</h3>
            </div>
          </div>
        )}

        <div
          className="w-10 overflow-hidden flex items-center justify-center rounded-md ml-1 frosted-nav"
          onClick={() => saveGradient(gradient.id)}
        >
          <Tooltip title="Save Gradient">
            <Button className="btn">
              <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                <BsBookmarkPlus className="text-[1.3rem]" />
              </div>
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center uppercase">
          <h3
            className="text-md font-medium"
            style={{ color: `${gradient.colors[0]}` }}
          >
            {gradient.colors[0]}
          </h3>
          <h3
            className="text-md font-medium ml-1 uppercase"
            style={{ color: `${gradient.colors[1]}` }}
          >
            {gradient.colors[1]}
          </h3>
        </div>
        <div className="flex items-center mt-2">
          <Tooltip title="Copy to Clipboard">
            <div
              className="w-12 overflow-hidden flex items-center justify-center rounded-md border border-[#eee] bg-gray-100 transition duration-500 hover:bg-gray-200"
              onClick={copyCSS}
            >
              <Button className="btn">
                <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                  <BsCode className="text-[1.5rem]" />
                </div>
              </Button>
            </div>
          </Tooltip>
          <Tooltip title={`Likes ${gradient.hearts.length}`}>
            <div className="w-15 overflow-hidden flex items-center justify-center rounded-md border border-[#eee] ml-1 bg-gray-100 transition duration-500 hover:bg-gray-200">
              <Button className="btn">
                <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                  <BsHeart className="text-[1rem]" />
                  <h3 className="ml-1 text-lg font-normal">
                    {gradient.hearts.length}
                  </h3>
                </div>
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Gradient;
