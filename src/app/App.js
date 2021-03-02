import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "animate.css/animate.css";
import Footer from "../components/Footer";
import Gradient from "../components/Gradient";
import Header from "../components/Header";
import useLocalStorage from "../hooks/useLocalStorage";
import GradientGenerator from "../components/GradientGenerator";
import "../styles/App.css";
import Fullpage from "../components/Fullpage";
import Contributors from "../components/Contributors";
import Notfound from "../components/Notfound";
import { useMediaQuery } from '@material-ui/core';

const App = () => {
  const [data, setData] = useState([]);
  const [align, setAlign] = useLocalStorage("align:", "left");
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
		noSsr: true,
	});
  const [dark, setDark] = useLocalStorage("mode:", prefersDarkMode);

  useEffect(() => {
		setDark(prefersDarkMode);
	}, [prefersDarkMode, setDark]);

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

  const rotate = () => {
    if (align == "left") {
      setAlign("right");
    } else if (align == "right") {
      setAlign("top");
    } else if (align == "top") {
      setAlign("bottom");
    } else {
      setAlign("left");
    }
  };
  const changeMode = () => {
    if (dark) setDark(false);
    else setDark(true);
  };

  return (
    <Router>
      {dark ? (
        <div className="main dark">
          <Switch>
            <Route path="/" exact>
              <div className="App">
                <ToastContainer limit={2} />
                <Header rotate={rotate} changeMode={changeMode} />
                <div className="colorCont flex">
                  {data.map((gradient) => (
                    <Gradient
                      gradient={gradient}
                      id={gradient.id}
                      align={align}
                      key={gradient.id}
                    />
                  ))}
                </div>
                <Footer />
              </div>
            </Route>
            <Route path="/gradient_generator" exact>
              <ToastContainer limit={2} />
              <Header rotate={rotate} changeMode={changeMode} />
              <GradientGenerator />
              <Footer />
            </Route>
            <Route path="/gradient/:id" exact>
              <ToastContainer limit={2} />
              <Header rotate={rotate} changeMode={changeMode} />
              <Fullpage data={data} align={align} />
            </Route>
            <Route path="/contributors" exact>
              <Header rotate={rotate} changeMode={changeMode} />
              <div className="contributors flex">
                {data.map((contributor) => (
                  <Contributors contributor={contributor} />
                ))}
              </div>
              <Footer />
            </Route>
            <Route component={Notfound} />
          </Switch>
        </div>
      ) : (
        <div className="main light">
          <Switch>
            <Route path="/" exact>
              <div className="App">
                <ToastContainer limit={2} />
                <Header rotate={rotate} changeMode={changeMode} />
                <div className="colorCont flex">
                  {data.map((gradient) => (
                    <Gradient
                      gradient={gradient}
                      id={gradient.id}
                      align={align}
                      key={gradient.id}
                    />
                  ))}
                </div>
                <Footer />
              </div>
            </Route>
            <Route path="/gradient_generator" exact>
              <ToastContainer limit={2} />
              <Header rotate={rotate} changeMode={changeMode} />
              <GradientGenerator />
              <Footer />
            </Route>
            <Route path="/gradient/:id" exact>
              <ToastContainer limit={2} />
              <Header rotate={rotate} changeMode={changeMode} />
              <Fullpage data={data} align={align} />
            </Route>
            <Route path="/contributors" exact>
              <Header rotate={rotate} changeMode={changeMode} />
              <div className="contributors flex">
                {data.map((contributor) => (
                  <Contributors contributor={contributor} />
                ))}
              </div>
              <Footer />
            </Route>
            <Route component={Notfound} />
          </Switch>
        </div>
      )}
    </Router>
  );
};

export default App;
