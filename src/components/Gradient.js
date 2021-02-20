import { Button, Tooltip } from "@material-ui/core";
import { Code, GitHub } from "@material-ui/icons";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

const Gradient = ({ gradient }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const notify = () => {
    toast("Copied CSS 🚀");
  };
  return (
    <div className="gradient" data-aos="fade-up-left">
      {gradient.colors.length == 5 ? (
        <>
          <div
            className="gradientPriview flex"
            style={{
              background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]}, ${gradient.colors[4]})`,
            }}
          >
            <h4>
              From <GitHub />
              <a href={"https://github.com/" + gradient.githubUsername}>
                {gradient.githubUsername}
              </a>
            </h4>
          </div>
          <div className="bottom flex">
            <div className="allColors flex">
              <h5
                style={{ color: `${gradient.colors[0]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[0]}`)
                }
              >
                {gradient.colors[0]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[1]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[1]}`)
                }
              >
                {gradient.colors[1]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[2]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[2]}`)
                }
              >
                {gradient.colors[2]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[3]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[3]}`)
                }
              >
                {gradient.colors[3]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[4]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[4]}`)
                }
              >
                {gradient.colors[4]}
              </h5>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(
                  `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]}, ${gradient.colors[4]})`
                );
                notify();
              }}
            >
              <Code />
            </Button>
          </div>
        </>
      ) : gradient.colors.length == 4 ? (
        <>
          <div
            className="gradientPriview flex"
            style={{
              background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]})`,
            }}
          >
            <h4>
              From <GitHub />
              <a href={"https://github.com/" + gradient.githubUsername}>
                {gradient.githubUsername}
              </a>
            </h4>
          </div>
          <div className="bottom flex">
            <div className="allColors flex">
              <h5
                style={{ color: `${gradient.colors[0]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[0]}`)
                }
              >
                {gradient.colors[0]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[1]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[1]}`)
                }
              >
                {gradient.colors[1]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[2]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[2]}`)
                }
              >
                {gradient.colors[2]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[3]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[3]}`)
                }
              >
                {gradient.colors[3]}
              </h5>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(
                  `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]});`
                );
                notify();
              }}
            >
              <Code />
            </Button>
          </div>
        </>
      ) : gradient.colors.length == 3 ? (
        <>
          <div
            className="gradientPriview flex"
            style={{
              background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]})`,
            }}
          >
            <h4>
              From <GitHub />
              <a href={"https://github.com/" + gradient.githubUsername}>
                {gradient.githubUsername}
              </a>
            </h4>
          </div>

          <div className="bottom flex">
            <div className="allColors flex">
              <h5
                style={{ color: `${gradient.colors[0]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[0]}`)
                }
              >
                {gradient.colors[0]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[1]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[1]}`)
                }
              >
                {gradient.colors[1]}
              </h5>
              <h5
                style={{ color: `${gradient.colors[2]}` }}
                onClick={() =>
                  navigator.clipboard.writeText(`${gradient.colors[2]}`)
                }
              >
                {gradient.colors[2]}
              </h5>
            </div>
            <Tooltip title="Copy Gradient" aria-label="add">
              <Button
                variant="contained"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]});`
                  );
                  notify();
                }}
              >
                <Code />
              </Button>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <div
            className="gradientPriview flex"
            style={{
              background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]})`,
            }}
          >
            <h4>
              From <GitHub />
              <a href={"https://github.com/" + gradient.githubUsername}>
                {gradient.githubUsername}
              </a>
            </h4>
          </div>
          <div className="bottom flex">
            <div className="allColors flex">
              <Tooltip title="Copy Color" aria-label="add">
                <h5
                  style={{ color: `${gradient.colors[0]}` }}
                  onClick={() =>
                    navigator.clipboard.writeText(`${gradient.colors[0]}`)
                  }
                >
                  {gradient.colors[0]}
                </h5>
              </Tooltip>
              <Tooltip title="Copy Color" aria-label="add">
                <h5
                  style={{ color: `${gradient.colors[1]}` }}
                  onClick={() =>
                    navigator.clipboard.writeText(`${gradient.colors[1]}`)
                  }
                >
                  {gradient.colors[1]}
                </h5>
              </Tooltip>
            </div>
            <Tooltip title="Copy Gradient" aria-label="add">
              <Button
                variant="contained"
                className="btn"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]});`
                  );
                  notify();
                }}
              >
                <Code />
              </Button>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};

export default Gradient;
