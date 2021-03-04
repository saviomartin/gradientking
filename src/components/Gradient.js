import { Button, Tooltip } from "@material-ui/core";
import { Code, GitHub, Star, StarOutline } from "@material-ui/icons";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";

const Gradient = ({
  gradient,
  align,
  id,
  savedGradients,
  setSavedGradients,
}) => {
  const history = useHistory();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const notify = () => {
    toast("Copied CSS 🚀");
  };
  const search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return i;
      }
    }
    return false;
  };
  const saveGradient = () => {
    console.log(search(id, savedGradients));
    if (search(id, savedGradients) !== false) {
      toast("Gradient Deleted 📕");
      const tempGradients = savedGradients;
      tempGradients.splice(search(id, savedGradients), 1);
      setSavedGradients([...tempGradients]);
    } else {
      toast("Gradient Saved 📗");
      setSavedGradients([...savedGradients, gradient]);
    }
  };
  return (
    <div className="gradient" data-aos="fade-left">
      <div
        className="gradientPriview flex"
        style={{
          background: `linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]})`,
        }}
        onClick={() => history.push("/gradient/" + id)}
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
        <Tooltip title="Save Gradient" aria-label="add">
          <Button
            variant="contained"
            className="btn"
            onClick={() => {
              navigator.clipboard.writeText(
                `background: linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]});`
              );
              saveGradient();
            }}
          >
            {search(id, savedGradients) !== false ? <Star /> : <StarOutline />}
          </Button>
        </Tooltip>
        <Tooltip title="Copy Gradient" aria-label="add">
          <Button
            variant="contained"
            className="btn"
            onClick={() => {
              navigator.clipboard.writeText(
                `background: linear-gradient(to ${align}, ${gradient.colors[0]}, ${gradient.colors[1]});`
              );
              notify();
            }}
          >
            <Code />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Gradient;
