import { Button } from "@material-ui/core";
import { Code } from "@material-ui/icons";
import React from "react";

const Gradient = ({ gradient }) => {
  const copyGradient = () => {
    var text = "Example text to appear on clipboard";
    navigator.clipboard.writeText(text);
  };
  return (
    <div className="gradient">
      {gradient.colors.length == 5 ? (
        <>
          <div
            className="gradientPriview flex"
            style={{
              background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]}, ${gradient.colors[4]})`,
            }}
          >
            <h4>{gradient.name}</h4>
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
              onClick={() =>
                navigator.clipboard.writeText(
                  `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]}, ${gradient.colors[4]})`
                )
              }
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
            <h4>{gradient.name}</h4>
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
              onClick={() =>
                navigator.clipboard.writeText(
                  `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]});`
                )
              }
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
            <h4>{gradient.name}</h4>
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
            <Button
              variant="contained"
              onClick={() =>
                navigator.clipboard.writeText(
                  `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]});`
                )
              }
            >
              <Code />
            </Button>
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
            <h4>{gradient.name}</h4>
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
            </div>
            <Button
              variant="contained"
              className="btn"
              onClick={() =>
                navigator.clipboard.writeText(
                  `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]});`
                )
              }
            >
              <Code />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Gradient;
