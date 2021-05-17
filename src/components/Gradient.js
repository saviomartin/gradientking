import { Button, Tooltip } from "@material-ui/core";
import React from "react";

import { BsCode, BsTriangle } from "react-icons/bs";

const Gradient = ({ gradient }) => {
  return (
    <div className="p-4 gradient-shadow bg-white m-3 rounded-md transition duration-400 cursor-pointer text-[#222]">
      <div
        className="h-[200px] w-[280px] rounded-md"
        style={{
          background: `linear-gradient(to right, ${gradient.colors[0]}, ${gradient.colors[1]})`,
        }}
      ></div>
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
          <Tooltip title="Rotate Gradient">
            <div className="w-12 overflow-hidden flex items-center justify-center rounded-md border border-[#eee]">
              <Button className="btn">
                <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                  <BsCode className="text-[1.5rem]" />
                </div>
              </Button>
            </div>
          </Tooltip>
          <Tooltip title="Rotate Gradient">
            <div className="w-15 overflow-hidden flex items-center justify-center rounded-md border border-[#eee] ml-1">
              <Button className="btn">
                <div className="w-full h-9 flex items-center justify-center overflow-hidden">
                  <BsTriangle className="text-[1rem]" />
                  <h3 className="ml-1 text-lg font-normal">
                    {gradient.upvotes}
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
