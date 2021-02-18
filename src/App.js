import React, { useEffect, useState } from "react";
import "./styles/App.css";

const App = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>
        {data && data.length > 0 && data.map((item) => <p>{item.about}</p>)}
      </h1>
    </div>
  );
};

export default App;
