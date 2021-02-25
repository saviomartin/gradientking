import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h3 className="footer">
        Made with 💖 by
        <a href="https://github.com/saviomartin"> Savio Martin.</a> Thanks to
        all <Link to="/contributors">Contributors.</Link>
      </h3>
    </div>
  );
};

export default Footer;
