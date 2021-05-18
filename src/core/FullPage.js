import { Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { db } from "../backend";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as CodeMirror } from "react-codemirror2";

const FullPage = ({ align }) => {
  const [gradient, setGradient] = useState([]);

  let params = useParams();

  const gradientId = params.id;

  useEffect(() => {
    const getDoc = async (id) => {
      const snapshot = await db.collection("gradients").doc(id).get();
      setGradient(snapshot.data());
    };
    getDoc(gradientId);
  }, []);

  //copy single color to clipboard
  const copySingleColor = (color) => {
    navigator.clipboard.writeText(color);
    toast.success("Copied to clipboard!"); // toaster
  };

  let code =
    gradient.colors &&
    `background: ${gradient.colors[0]};  /* fallback for old browsers */\nbackground: -webkit-linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]});  /* Chrome 10-25, Safari 5.1-6 */\nbackground: linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */`;

  return gradient.colors ? (
    <div className="flex items-center justify-center h-[87.5vh] w-full">
      <div
        className="w-[85%] h-[85%] flex items-center justify-center rounded-md gradient-shadow"
        style={{
          background: `linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]})`,
        }}
      >
        <div className="py-8 rounded-md w-8/12 flex items-start justify-center flex-col px-6 bg-white gradient-shadow">
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
          <div className="w-full overflow-hidden rounded-md">
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
  ) : (
    "loading"
  );
};

export default FullPage;
