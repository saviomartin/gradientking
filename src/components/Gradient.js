import React from "react";

const Gradient = ({ gradient }) => {
  return (
    <div className="gradient">
      {gradient.colors.length == 5 ? (
        <div
          className="gradientPriview"
          style={{
            background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]}, ${gradient.colors[4]})`,
          }}
        ></div>
      ) : gradient.colors.length == 4 ? (
        <div
          className="gradientPriview"
          style={{
            background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]}, ${gradient.colors[3]})`,
          }}
        ></div>
      ) : gradient.colors.length == 3 ? (
        <div
          className="gradientPriview"
          style={{
            background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]}, ${gradient.colors[2]})`,
          }}
        ></div>
      ) : (
        <div
          className="gradientPriview"
          style={{
            background: `linear-gradient(to left, ${gradient.colors[0]}, ${gradient.colors[1]})`,
          }}
        ></div>
      )}

      <h1>{gradient.colors.length}</h1>
    </div>
  );
};

export default Gradient;
