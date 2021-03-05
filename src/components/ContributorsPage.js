import React, { useState, useEffect } from "react";
import Contributors from "./Contributors";

function ContributorsPage() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="contributors flex">
      {data.map((contributor) => (
        <Contributors contributor={contributor} />
      ))}
    </div>
  );
}

export default ContributorsPage;
