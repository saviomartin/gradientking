import React, { useState } from "react";
import { Palette } from "color-thief-react";
import { Button, Tooltip } from "@material-ui/core";
import toast from "react-hot-toast";
import { BsCode } from "react-icons/bs";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as CodeMirror } from "react-codemirror2";

const Generator = ({ align }) => {
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

  const imgSrc = image;
  return (
    <div className="h-[87.5vh] w-full">
      <Palette src={imgSrc} crossOrigin="anonymous" format="hex" colorCount={3}>
        {({ data, loading }) => {
          if (loading) return "Loading..";

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
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-6/12 h-full flex items-center justify-center">
                <div className="bg-white gradient-shadow rounded-md p-5 max-w-[90%] overflow-hidden">
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
                  <div className="w-full flex items-center justify-between mt-4">
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
                          className="p-2 frosted-nav text-md rounded-md cursor-pointer focus:outline-none border border-[#eee] label"
                        >
                          Select file
                        </label>
                      </div>
                      <Tooltip title="Copy CSS">
                        <div
                          className="overflow-hidden flex items-center justify-center rounded-md border border-[#eee] bg-gray-100 transition duration-500 hover:bg-gray-200 ml-2"
                          onClick={copyCSS}
                        >
                          <Button className="btn">
                            <div className="w-40 h-9 flex items-center justify-center overflow-hidden">
                              <BsCode className="text-[1.5rem]" />
                              <h3 className="ml-1 text-md font-normal capitalize">
                                Copy Code
                              </h3>
                            </div>
                          </Button>
                        </div>
                      </Tooltip>
                    </div>
                    <h3>{filename}</h3>
                  </div>
                </div>
              </div>
              <div className="w-6/12 h-full flex items-center justify-center pr-10">
                <div
                  className="w-[100%] h-[75%] flex items-center justify-center rounded-md gradient-shadow"
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
