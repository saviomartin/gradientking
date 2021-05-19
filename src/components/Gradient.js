import { Button, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  BsBookmarkCheck,
  BsBookmarkPlus,
  BsClipboard,
  BsCode,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { db } from "../backend";

const Gradient = ({
  gradient,
  user,
  align,
  savedGradients,
  setSavedGradients,
}) => {
  const [showCopyBg, setShowCopyBg] = useState(false);
  const [showSaveBg, setShowSaveBg] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);

  // css code
  const CSS = `background: ${gradient.colors[0]};  /* fallback for old browsers */\nbackground: -webkit-linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]});  /* Chrome 10-25, Safari 5.1-6 */\nbackground: linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`;

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

  //copy single color to clipboard
  const copySingleColor = (color) => {
    navigator.clipboard.writeText(color);
    toast.success("Copied to clipboard!"); // toaster

    setShowCopyBg(true); //ui change
    setTimeout(() => {
      setShowCopyBg(false);
    }, [1000]);
  };

  const saveGradient = () => {
    if (isBookMarked) {
      setSavedGradients(
        savedGradients.filter(
          (savedGradient) => savedGradient.id !== gradient.id
        )
      );
      // toast
      toast.success("Removed Gradient from Saved!");
    } else {
      setSavedGradients([
        ...savedGradients,
        {
          id: gradient.id,
          colors: gradient.colors,
        },
      ]);
      // toast
      toast.success("Saved Gradient!");

      setShowSaveBg(true); //ui change
      setTimeout(() => {
        setShowSaveBg(false);
      }, [1000]);
    }
  };

  let isLiked = false;
  if (user) {
    isLiked = gradient.hearts.includes(user.email);
  }

  const likeGradient = (id) => {
    if (user) {
      if (isLiked) {
        const index = gradient.hearts.indexOf(user.email);
        gradient.hearts.splice(index, 1);

        db.collection("gradients").doc(id).update({
          hearts: gradient.hearts,
        });
      } else {
        db.collection("gradients")
          .doc(id)
          .update({
            hearts: [...gradient.hearts, user.email],
          });
      }
    } else {
      console.log("Please Login");
    }
  };

  const fetchSavedGradients = () => {
    if (
      savedGradients.some((savedGradient) => savedGradient.id === gradient.id)
    ) {
      setIsBookMarked(true);
    } else {
      setIsBookMarked(false);
    }
  };

  useEffect(() => {
    fetchSavedGradients();
  });

  return (
    <div className="p-4 gradient-shadow bg-white m-3 rounded-md transition duration-400 cursor-pointer text-[#222]">
      <div
        className="h-[200px] w-[280px] rounded-md flex items-start justify-end p-2 relative overflow-hidden"
        style={{
          background: `linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]})`,
        }}
      >
        {showCopyBg && (
          <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center">
            <div className="w-[92.5%] h-[92.5%] frosted-nav rounded-md flex items-center justify-center flex-col">
              <BsClipboard className="text-3xl text-[#111]" />
              <h3 className="text-[#111] mt-2">Copied to Clipboard</h3>
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
        <Link to={`/gradient/${gradient.id}`}>
          <div className="w-10 overflow-hidden flex items-start justify-center rounded-md ml-1 text-white">
            <Tooltip title="View In Full">
              <Button className="btn">
                <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                  <HiOutlineExternalLink className="text-[1.3rem] text-white" />
                </div>
              </Button>
            </Tooltip>
          </div>
        </Link>
        <div
          className="w-10 overflow-hidden flex items-center justify-center rounded-md ml-1 bg-white z-1"
          onClick={() => saveGradient(gradient.id)}
        >
          <Tooltip title="Save Gradient">
            <Button className="btn">
              <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                {isBookMarked ? (
                  <BsBookmarkCheck className="text-[1.3rem] text-[#FFDD00]" />
                ) : (
                  <BsBookmarkPlus className="text-[1.3rem]" />
                )}
              </div>
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center uppercase">
          <Tooltip title={`Copy ${gradient.colors[0]}`}>
            <h3
              className="text-md font-medium"
              onClick={() => copySingleColor(gradient.colors[0])}
              style={{ color: `${gradient.colors[0]}` }}
            >
              {gradient.colors[0]}
            </h3>
          </Tooltip>
          <Tooltip title={`Copy ${gradient.colors[1]}`}>
            <h3
              className="text-md font-medium ml-1 uppercase"
              onClick={() => copySingleColor(gradient.colors[1])}
              style={{ color: `${gradient.colors[1]}` }}
            >
              {gradient.colors[1]}
            </h3>
          </Tooltip>
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
          {gradient.hearts && (
            <Tooltip title={`Likes ${gradient.hearts.length}`}>
              <div
                className="w-15 overflow-hidden flex items-center justify-center rounded-md border border-[#eee] ml-1 bg-gray-100 transition duration-500 hover:bg-gray-200"
                onClick={() => likeGradient(gradient.id)}
              >
                <Button className="btn">
                  <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                    {isLiked ? (
                      <BsHeartFill className="text-[1rem] text-[#e53935]" />
                    ) : (
                      <BsHeart className="text-[1rem]" />
                    )}
                    <h3
                      className={`ml-1 text-lg font-normal ${
                        isLiked && "text-[#e53935]"
                      }`}
                    >
                      {gradient.hearts.length}
                    </h3>
                  </div>
                </Button>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gradient;
