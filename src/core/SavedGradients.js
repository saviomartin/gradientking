import React from "react";
import { Gradient } from "../components";

const SavedGradients = ({ align, savedGradients, setSavedGradients }) => {
  return (
    <div className="w-full h-full flex justify-center flex-wrap">
      <h1 className="text-4xl font-bold Raleway my-3">Saved Gradients</h1>
      <div className="w-full h-full flex justify-center flex-wrap">
        {savedGradients.map((gradient) => (
          <Gradient
            gradient={gradient}
            key={gradient.id}
            align={align}
            savedGradients={savedGradients}
            setSavedGradients={setSavedGradients}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedGradients;
