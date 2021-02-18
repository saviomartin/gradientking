import React, { useEffect, useState } from "react";
import Gradient from "./components/Gradient";
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
      .then(function (data) {
        console.log(data);
        setData(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="colorCont flex">
        {data.map((gradient) => (
          <Gradient gradient={gradient} />
        ))}
      </div>
    </div>
  );
};

export default App;
