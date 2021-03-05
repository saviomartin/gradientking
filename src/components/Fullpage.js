import { Button, Tooltip } from "@material-ui/core";
import { Code, GitHub, Star, StarOutline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Fullpage = ({ align, savedGradients, setSavedGradients }) => {
  let params = useParams();
  const [data, setData] = useState([]);
  const [id, setId] = useState(params.id);
  const [username, setUserName] = useState("");
  const [code, setCode] = useState("");

  const notify = () => {
    toast("Copied CSS 🚀");
  };

  const search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
        return i;
      }
    }
    return false;
  };

  const saveGradient = () => {
    if (search(id, savedGradients) !== false) {
      toast("Gradient Deleted 📕");
      const tempGradients = savedGradients;
      tempGradients.splice(search(id, savedGradients), 1);
      setSavedGradients([...tempGradients]);
    } else {
      toast("Gradient Saved 📗");

      setSavedGradients([...savedGradients, data[id]]);
    }
  };

  React.useEffect(() => {
    fetch("../data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (resp) {
        console.log(resp[id]);
        setData(resp);
        setCode(`
  background: ${resp[id].colors[0]};  /* fallback for old browsers */
  background: -webkit-linear-gradient(to ${align}, ${resp[id].colors[0]}, ${resp[id].colors[1]});
  background: linear-gradient(to ${align}, ${resp[id].colors[0]}, ${resp[id].colors[1]});`);
        setUserName(resp[id].githubUsername);
      });
  }, []);

  return (
    <>
      {data[id] && (
        <div className="fullpage flex">
          <div className="fullpage__left flex animate__animated animate__fadeInLeft">
            <div className="fullpage_colors flex">
              <Tooltip title="Copy Color" aria-label="add">
                <h1
                  style={{ color: `${data[id].colors[0]}` }}
                  onClick={() =>
                    navigator.clipboard.writeText(`${data[id].colors[0]}`)
                  }
                >
                  {data[id].colors[0]}
                </h1>
              </Tooltip>
              <Tooltip title="Copy Color" aria-label="add">
                <h1
                  style={{ color: `${data[id].colors[1]}` }}
                  onClick={() =>
                    navigator.clipboard.writeText(`${data[id].colors[1]}`)
                  }
                >
                  {data[id].colors[1]}
                </h1>
              </Tooltip>
            </div>
            <textarea value={code}></textarea>
            <div className="fullpage__bottom flex">
              <div className="fullpage__btns">
                <Tooltip title="Copy CSS" aria-label="add">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(`${code}`);
                      notify();
                    }}
                    style={{ border: `1px solid ${data[id].colors[0]}` }}
                  >
                    Copy CSS <Code />
                  </Button>
                </Tooltip>
                <Tooltip
                  title={
                    search(id, savedGradients) !== false ? "Saved" : "Save"
                  }
                  aria-label="add"
                >
                  <Button
                    onClick={() => {
                      saveGradient();
                    }}
                    style={{
                      border: `1px solid ${data[id].colors[0]}`,
                      marginLeft: 8,
                    }}
                  >
                    {search(id, savedGradients) !== false ? (
                      <>
                        Saved <Star />
                      </>
                    ) : (
                      <>
                        Save <StarOutline />
                      </>
                    )}
                  </Button>
                </Tooltip>
              </div>
              <h3>
                From <GitHub className="ghicon" />
                <a href={"https://github.com/" + username}>{username}</a>
              </h3>
            </div>
          </div>
          <div className="fullpage__right flex animate__animated animate__fadeInRight">
            <div
              className="preview"
              style={{
                background: `linear-gradient(to ${align}, ${data[id].colors[0]}, ${data[id].colors[1]})`,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fullpage;
