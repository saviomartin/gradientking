import { Button, Tooltip } from "@material-ui/core";
import { Code, GitHub } from "@material-ui/icons";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Fullpage = ({ data, align }) => {
  let params = useParams();
  const id = params.id;
  const username = data[id].githubUsername;

  const code = `
  background: ${data[id].colors[0]};  /* fallback for old browsers */
  background: -webkit-linear-gradient(to ${align}, ${data[id].colors[0]}, ${data[id].colors[1]});
  background: linear-gradient(to ${align}, ${data[id].colors[0]}, ${data[id].colors[1]});
  `;
  const notify = () => {
    toast("Copied CSS 🚀");
  };

  return (
    <div className="fullpage flex">
      <div className="fullpage__left flex animate__animated animate__fadeInLeft">
        <div className="fullpage_colors flex">
          <Tooltip title="Copy Color" aria-label="add">
            <h1
              style={{ color: `${data[id].colors[0]}` }}
              onClick={() =>
                navigator.clipboard.writeText(`${data[id].colors[0]}`)
              }
            >
              {data[id].colors[0]}
            </h1>
          </Tooltip>
          <Tooltip title="Copy Color" aria-label="add">
            <h1
              style={{ color: `${data[id].colors[1]}` }}
              onClick={() =>
                navigator.clipboard.writeText(`${data[id].colors[1]}`)
              }
            >
              {data[id].colors[1]}
            </h1>
          </Tooltip>
        </div>
        <textarea value={code}></textarea>
        <div className="fullpage__bottom flex">
          <div className="fullpage__btns">
            <Tooltip title="Copy CSS" aria-label="add">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(`${code}`);
                  notify();
                }}
                style={{ border: `1px solid ${data[id].colors[0]}` }}
              >
                Copy CSS <Code />
              </Button>
            </Tooltip>
          </div>
          <h3>
            From <GitHub className="ghicon" />
            <a href={"https://github.com/" + username}>{username}</a>
          </h3>
        </div>
      </div>
      <div className="fullpage__right flex animate__animated animate__fadeInRight">
        <div
          className="preview"
          style={{
            background: `linear-gradient(to ${align}, ${data[id].colors[0]}, ${data[id].colors[1]})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Fullpage;
