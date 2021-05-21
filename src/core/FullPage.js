import React, { forwardRef, useEffect, useRef, useState } from "react";

// material design
import { Button, Tooltip } from "@material-ui/core";
import { exportComponentAsPNG } from "react-component-export-image";
// create toast
import toast from "react-hot-toast";

// react router
import { useParams } from "react-router";

// firestore
import { db } from "../backend";

// codemirror files
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as CodeMirror } from "react-codemirror2";

// icons
import {
  BsBookmarkCheck,
  BsBookmarkPlus,
  BsCode,
  BsDownload,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";

const FullPage = ({ align, user, savedGradients, setSavedGradients }) => {
  const [gradient, setGradient] = useState([]);
  const [isBookMarked, setIsBookMarked] = useState(false);

  let params = useParams();
  const componentRef = useRef();

  // get gradient id from the params
  const gradientId = params.id;

  const ComponentToPrint = forwardRef((props, ref) => (
    <div
      className="h-[400px] w-[800px] overflow-hidden absolute top-0 left-0 z-[-10]"
      ref={ref}
      style={{
        background: `linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]})`,
      }}
    ></div>
  ));

  const getDoc = async (id) => {
    const snapshot = await db.collection("gradients").doc(id).get();
    setGradient(snapshot.data());
  };

  useEffect(() => {
    getDoc(gradientId);
  }, [gradientId]);

  //copy single color to clipboard
  const copySingleColor = (color) => {
    navigator.clipboard.writeText(color);
    toast.success("Copied to clipboard!"); // toaster
  };

  let code =
    gradient.colors &&
    `background: ${gradient.colors[0]};  /* fallback for old browsers */\nbackground: -webkit-linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]});  /* Chrome 10-25, Safari 5.1-6 */\nbackground: linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`;

  let isLiked = false;
  if (user) {
    if (gradient.colors) {
      isLiked = gradient.hearts.includes(user.email);
      console.log(isLiked);
    }
  }

  const likeGradient = () => {
    if (user) {
      if (isLiked) {
        const index = gradient.hearts.indexOf(user.email);
        gradient.hearts.splice(index, 1);

        db.collection("gradients").doc(gradientId).update({
          hearts: gradient.hearts,
        });

        getDoc(gradientId);
      } else {
        db.collection("gradients")
          .doc(gradientId)
          .update({
            hearts: [...gradient.hearts, user.email],
          });

        getDoc(gradientId);
      }
    } else {
      console.log("Please Login");
    }
  };

  // copy css func
  const copyCSS = () => {
    // clipboard api
    navigator.clipboard.writeText(code);

    toast.success("Copied to clipboard!"); // toaster
  };

  const saveGradient = () => {
    if (isBookMarked) {
      setSavedGradients(
        savedGradients.filter(
          (savedGradient) => savedGradient.id !== gradientId
        )
      );
      // toast
      toast.success("Removed Gradient from Saved!");
    } else {
      setSavedGradients([
        ...savedGradients,
        {
          id: gradientId,
          colors: gradient.colors,
        },
      ]);
      // toast
      toast.success("Saved Gradient!");
    }
  };

  const fetchSavedGradients = () => {
    if (
      savedGradients.some((savedGradient) => savedGradient.id === gradientId)
    ) {
      setIsBookMarked(true);
    } else {
      setIsBookMarked(false);
    }
  };

  useEffect(() => {
    fetchSavedGradients();
  });

  return gradient.colors ? (
    <div className="flex items-center justify-center h-[87.5vh] w-full">
      <ComponentToPrint ref={componentRef} />
      <div
        className="w-[85%] h-[85%] flex items-center justify-center rounded-md gradient-shadow"
        style={{
          background: `linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]})`,
        }}
      >
        <div className="py-8 rounded-md w-8/12 flex items-start justify-center flex-col px-6 bg-white gradient-shadow dark:bg-[#333] border dark:border-[#444]">
          <div className="flex items-center">
            <Tooltip title={`Copy ${gradient.colors[0]}`}>
              <h3
                className="text-4xl font-bold  cursor-pointer"
                onClick={() => copySingleColor(gradient.colors[0])}
                style={{ color: `${gradient.colors[0]}` }}
              >
                {gradient.colors[0]}
              </h3>
            </Tooltip>
            <Tooltip title={`Copy ${gradient.colors[1]}`}>
              <h3
                className="text-4xl font-bold ml-1 cursor-pointer"
                onClick={() => copySingleColor(gradient.colors[1])}
                style={{ color: `${gradient.colors[1]}` }}
              >
                {gradient.colors[1]}
              </h3>
            </Tooltip>
          </div>
          <div className="w-full overflow-hidden rounded-md h-40 mt-2">
            <CodeMirror
              value={code}
              options={{
                mode: "css",
                lineWrapping: true,
                theme: "material-palenight",
                lineNumbers: true,
              }}
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            {gradient.hearts && (
              <Tooltip title={`Likes ${gradient.hearts.length}`}>
                <div
                  className="flex items-center justify-center rounded-md border border-[#eee] bg-gray-100 transition duration-500 hover:bg-gray-200 dark:border-[#555] dark:bg-[#181718]"
                  onClick={likeGradient}
                >
                  <Button className="btn">
                    <div className="w-40 h-9 flex items-center justify-center overflow-hidden">
                      {isLiked ? (
                        <BsHeartFill className="text-[1rem] text-[#e53935]" />
                      ) : (
                        <BsHeart className="text-[1rem] dark:text-[#fafafa]" />
                      )}
                      <h3
                        className={`ml-1 text-lg font-semibold capitalize ${
                          isLiked ? "text-[#e53935]" : "dark:text-[#fafafa]"
                        }`}
                      >
                        {gradient.hearts.length}
                        <span className="Raleway ml-1">Likes</span>
                      </h3>
                    </div>
                  </Button>
                </div>
              </Tooltip>
            )}
            <Tooltip title="Copy CSS">
              <div
                className="overflow-hidden flex items-center justify-center rounded-md border border-[#eee] bg-gray-100 transition duration-500 hover:bg-gray-200 ml-2 dark:border-[#555] dark:bg-[#181718]"
                onClick={copyCSS}
              >
                <Button className="btn">
                  <div className="w-40 h-9 flex items-center justify-center overflow-hidden">
                    <BsCode className="text-[1.5rem] dark:text-[#fafafa]" />
                    <h3 className="ml-1 text-lg font-semibold capitalize Raleway dark:text-[#fafafa]">
                      Copy Code
                    </h3>
                  </div>
                </Button>
              </div>
            </Tooltip>
            <Tooltip title="Bookmark Gradient">
              <div
                className="overflow-hidden flex items-center justify-center rounded-md border border-[#eee] bg-gray-100 transition duration-500 hover:bg-gray-200 ml-2 dark:border-[#555] dark:bg-[#181718]"
                onClick={saveGradient}
              >
                <Button className="btn">
                  <div className="w-40 h-9 flex items-center justify-center overflow-hidden">
                    {isBookMarked ? (
                      <BsBookmarkCheck className="text-[1.3rem] text-[#fec821]" />
                    ) : (
                      <BsBookmarkPlus className="text-[1.3rem] dark:text-[#fafafa]" />
                    )}
                    {isBookMarked ? (
                      <h3 className="ml-1 text-lg font-semibold capitalize text-[#fec821] Raleway">
                        Bookmarked
                      </h3>
                    ) : (
                      <h3 className="ml-1 text-lg font-semibold capitalize Raleway dark:text-[#fafafa]">
                        Bookmark
                      </h3>
                    )}
                  </div>
                </Button>
              </div>
            </Tooltip>
            <Tooltip title="Bookmark Gradient">
              <div
                className="overflow-hidden flex items-center justify-center rounded-md border border-[#eee] bg-gray-100 transition duration-500 hover:bg-gray-200 ml-2 dark:border-[#555] dark:bg-[#181718]"
                onClick={() =>
                  exportComponentAsPNG(componentRef, {
                    fileName: "gradient.png",
                  })
                }
              >
                <Button className="btn">
                  <div className="w-40 h-9 flex items-center justify-center overflow-hidden">
                    <BsDownload className="text-[1.3rem] dark:text-[#fafafa]" />
                    <h3 className="ml-1 text-lg font-semibold capitalize Raleway dark:text-[#fafafa]">
                      Download
                    </h3>
                  </div>
                </Button>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  ) : (
    "loading"
  );
};

export default FullPage;
