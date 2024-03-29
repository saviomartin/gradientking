import React, { useState } from "react";

// color-thief-react
// this package helps to extract colors from images
import { Palette } from "color-thief-react";

// material design
import { Button, Tooltip } from "@material-ui/core";

// create toast
import toast from "react-hot-toast";

// icons
import { BsCode } from "react-icons/bs";

// codemirror files
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Loading } from "../components";

const Generator = ({ align }) => {
  // demo image from flickr
  const [image, setImage] = useState(
    "https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg"
  );
  const [filename, setFileName] = useState("");

  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];

    setFileName(files[0].name);
    getBase64(file);
  };

  const onLoad = (fileString) => {
    setImage(fileString);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  //copy single color to clipboard
  const copySingleColor = (color) => {
    navigator.clipboard.writeText(color);
    toast.success("Copied to clipboard!"); // toaster
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files[0];

    setFileName(files[0].name);
    getBase64(file);
  };

  const imgSrc = image;
  return (
    <div className="h-full lg:h-[87.5vh] w-full">
      <Palette src={imgSrc} crossOrigin="anonymous" format="hex" colorCount={3}>
        {({ data, loading }) => {
          if (loading) return <Loading />;

          let code =
            data &&
            `background: ${data[0]};  /* fallback for old browsers */\nbackground: -webkit-linear-gradient(to ${align}, ${data[0]}, ${data[1]}, ${data[2]});  /* Chrome 10-25, Safari 5.1-6 */\nbackground: linear-gradient(to ${align}, ${data[0]}, ${data[1]}, ${data[2]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`;

          // copy css func
          const copyCSS = () => {
            // clipboard api
            navigator.clipboard.writeText(code);

            toast.success("Copied to clipboard!"); // toaster
          };

          return (
            <div
              className="h-full w-full block lg:flex items-center justify-center"
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <div className="w-full lg:w-6/12 h-auto lg:h-full flex items-center justify-center">
                <div className="bg-white gradient-shadow rounded-md p-5 max-w-[90%] overflow-hidden  dark:bg-[#222222] border dark:border-[#444] animate__animated animate__fadeInLeft">
                  <div className="w-full flex items-center">
                    <Tooltip title={`Copy ${data[0]}`}>
                      <h3
                        className="text-lg font-medium cursor-pointer uppercase"
                        onClick={() => copySingleColor(data[0])}
                        style={{ color: `${data[0]}` }}
                      >
                        {data[0]}
                      </h3>
                    </Tooltip>
                    <Tooltip title={`Copy ${data[1]}`}>
                      <h3
                        className="text-lg font-medium cursor-pointer ml-2 uppercase"
                        onClick={() => copySingleColor(data[1])}
                        style={{ color: `${data[1]}` }}
                      >
                        {data[1]}
                      </h3>
                    </Tooltip>
                    <Tooltip title={`Copy ${data[2]}`}>
                      <h3
                        className="text-lg font-medium cursor-pointer uppercase ml-2"
                        onClick={() => copySingleColor(data[2])}
                        style={{ color: `${data[2]}` }}
                      >
                        {data[0]}
                      </h3>
                    </Tooltip>
                  </div>
                  <img
                    src={imgSrc}
                    alt="Gradient"
                    className="w-[450px] max-w-[450px] overflow-hidden max-h-[300px] rounded-md"
                  />
                  <div className="w-full flex items-center justify-between mt-4 flex-wrap">
                    <div className="flex items-center justify-start">
                      <div class="file-input">
                        <input
                          type="file"
                          id="file"
                          class="file"
                          onChange={onChange}
                        />
                        <label
                          for="file"
                          className="p-2 frosted-nav text-md rounded-md cursor-pointer focus:outline-none border border-[#eee] label dark:border-[#777] dark:bg-[#24292E] dark:text-[#fafafa] dark:hover:bg-[#333]"
                        >
                          Select file
                        </label>
                      </div>
                      <Tooltip title="Copy CSS">
                        <div
                          className="overflow-hidden flex items-center justify-center rounded-md border border-[#eee] bg-gray-100 transition duration-500 hover:bg-gray-200 ml-2 dark:border-[#777] dark:bg-[#24292E] dark:hover:bg-[#333]"
                          onClick={copyCSS}
                        >
                          <Button className="btn">
                            <div className="w-40 h-9 flex items-center justify-center overflow-hidden">
                              <BsCode className="text-[1.5rem] dark:text-[#fafafa]" />
                              <h3 className="ml-1 text-md font-normal capitalize dark:text-[#fafafa]">
                                Copy Code
                              </h3>
                            </div>
                          </Button>
                        </div>
                      </Tooltip>
                    </div>
                    <h3 className="text-black dark:text-white">{filename}</h3>
                  </div>
                </div>
              </div>
              <div className="mt-2 lg:mt-0 w-full lg:w-6/12 h-auto lg:h-full flex items-center justify-center pr-0 lg:pr-10">
                <div
                  className="w-[100%] h-[75%] flex items-center justify-center rounded-md gradient-shadow animate__animated animate__fadeInRight py-10 lg:py-0"
                  style={{
                    background: `linear-gradient(to ${align}, ${data[0]}, ${data[1]}, ${data[2]})`,
                  }}
                >
                  <div className="w-[90%] overflow-hidden bg-white p-2 gradient-shadow rounded-md">
                    <div className="h-60 overflow-hidden rounded-md">
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
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Palette>
    </div>
  );
};

export default Generator;
