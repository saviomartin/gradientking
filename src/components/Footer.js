import { Button, Tooltip } from "@material-ui/core";
import { GitHub, Twitter } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const shareTwitter = () => {
    window.open(
      "https://twitter.com/intent/tweet?text=Hey%20there%20%F0%9F%91%8B,%20I%20just%20found%20an%20awesome%20tool%20that%20could%20help%20you%20get%20awesome%20gradients%20for%20your%20next%20project.%20It%20also%20supports%20the%20feature%20to%20generate%20gradients%20from%20local%20images.%20Enjoy%20Yourselves%20%F0%9F%8C%88%20https://dev.di7tazxmp7xob.amplifyapp.com/"
    );
  };
  const starGithub = () => {
    window.open("https://github.com/saviomartin/gradientking");
  };
  return (
    <div className="footer flex">
      <h3 className="footer">
        Made with 💖 by
        <a href="https://github.com/saviomartin"> Savio Martin.</a> Thanks to
        all <Link to="/contributors">Contributors.</Link>
      </h3>
      <div className="footer_buttons flex">
        <Tooltip title="Share the happiness">
          <Button onClick={shareTwitter}>
            <Twitter />
          </Button>
        </Tooltip>
        <Tooltip title="Star the project">
          <Button onClick={starGithub}>
            <GitHub />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Footer;
