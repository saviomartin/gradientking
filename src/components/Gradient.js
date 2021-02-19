import { Button } from "@material-ui/core";
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
          <div className="bottom">
            <Button
              variant="contained"
              onClick={() =>
                navigator.clipboard.writeText(`
              background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]}, ${gradient.colors[4]})
              `)
              }
            >
              Copy to clipboard
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
          <div className="bottom">
            <Button
              variant="contained"
              onClick={() =>
                navigator.clipboard.writeText(
                  `background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]});`
                )
              }
            >
              Copy to clipboard
            </Button>
          </div>
        </>
      ) : gradient.colors.length == 3 ? (
        <>
          <div
            className="gradientPriview flex"
            style={{
              background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]});`,
            }}
          >
            <h4>{gradient.name}</h4>
          </div>
          <div className="bottom">
            <Button
              variant="contained"
              onClick={() =>
                navigator.clipboard.writeText(`
              background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]});
              `)
              }
            >
              Copy to clipboard
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
          <div className="bottom">
            <Button
              variant="contained"
              onClick={() =>
                navigator.clipboard.writeText(`
              background: linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]});
              `)
              }
            >
              Copy to clipboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Gradient;
