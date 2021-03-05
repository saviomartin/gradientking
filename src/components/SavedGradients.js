import React, { useEffect, useState, useRef } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

import Gradient from "../components/Gradient";

function SavedGradients({ align, savedGradients, setSavedGradients }) {
  const savedGradientsRef = useRef();

  useEffect(() => {
    savedGradientsRef.current.style.minHeight = window.innerHeight - 141 + "px";
  }, []);

  return (
    <div className="savedGradients" ref={savedGradientsRef}>
      <h1 className="title">Saved Gradients</h1>
      {!savedGradients.length && (
        <div className="no-gradients-saved">
          You have not saved any gradients yet.
        </div>
      )}
      <div className="colorCont flex">
        {savedGradients &&
          savedGradients.map((gradient) => (
            <Gradient
              gradient={gradient}
              id={gradient.id}
              align={align}
              key={gradient.id}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          ))}
      </div>
    </div>
  );
}

export default SavedGradients;
