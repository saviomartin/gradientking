import { GitHub } from "@material-ui/icons";
import React from "react";
import $ from "jquery";

const Contributors = ({ contributor }) => {
  $(() => {
    [...$(".contributor")].reduce((a, e) => {
      if (a[e.textContent]) e.replaceWith("");
      else a[e.textContent] = !0;
      return a;
    }, {});
  });

  return (
    <div
      className={
        "contributor animate__animated animate__fadeInDown " +
        contributor.githubUsername
      }
      key={contributor.githubUsername}
    >
      <img
        src={
          "https://avatars.githubusercontent.com/" + contributor.githubUsername
        }
        alt=""
      />
      <h2>{contributor.githubUsername}</h2>
      <a href={"https://github.com/" + contributor.githubUsername}>
        <div className="githubUser flex">
          <GitHub />
          <p>{contributor.githubUsername}</p>
        </div>
      </a>
    </div>
  );
};

export default Contributors;
