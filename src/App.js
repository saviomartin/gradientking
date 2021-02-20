import React, { useEffect, useState } from "react";
import Gradient from "./components/Gradient";
import Header from "./components/Header";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GradientGenerator from "./components/GradientGenerator";
import { ToastContainer } from "react-toastify";

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
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <ToastContainer limit={2} />
            <Header />
            <div className="colorCont flex">
              {data.map((gradient) => (
                <Gradient gradient={gradient} />
              ))}
            </div>
            <h3 className="footer">
              Made with 💖 by
              <a href="https://github.com/sanvimerin">Sanvi Merin</a>
            </h3>
          </div>
        </Route>
        <Route path="/gradient_generator" exact>
          <ToastContainer limit={2} />
          <Header />
          <GradientGenerator />
          <h3 className="footer">
            Made with 💖 by
            <a href="https://github.com/sanvimerin">Sanvi Merin</a>
          </h3>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
