import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "animate.css/animate.css";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Header from "../components/Header";
import useLocalStorage from "../hooks/useLocalStorage";
import GradientGenerator from "../components/GradientGenerator";
import "../styles/App.css";
import Fullpage from "../components/Fullpage";
import ContributorsPage from "../components/ContributorsPage";
import Notfound from "../components/Notfound";
import SavedGradients from "../components/SavedGradients";
import { useMediaQuery } from "@material-ui/core";
import clsx from "clsx";

const App = () => {
  const [align, setAlign] = useLocalStorage("align:", "left");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const [dark, setDark] = useLocalStorage("mode:", prefersDarkMode);
  const [savedGradients, setSavedGradients] = useLocalStorage(
    "saved-gradients:",
    []
  );

  useEffect(() => {
    setDark(prefersDarkMode);
  }, [prefersDarkMode, setDark]);

  const rotate = () => {
    if (align === "left") {
      setAlign("right");
    } else if (align === "right") {
      setAlign("top");
    } else if (align === "top") {
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
      <div className={clsx(dark ? "main dark" : "main light")}>
        <Switch>
          <Route path="/" exact>
            <div className="App">
              <ToastContainer limit={2} />
              <Header rotate={rotate} changeMode={changeMode} />
              <Home
                align={align}
                savedGradients={savedGradients}
                setSavedGradients={setSavedGradients}
              />
              <Footer />
            </div>
          </Route>
          <Route path="/gradient/:id" exact>
            <ToastContainer limit={2} />
            <Header rotate={rotate} changeMode={changeMode} />
            <Fullpage
              align={align}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
            <Footer />
          </Route>
          <Route path="/contributors" exact>
            <Header rotate={rotate} changeMode={changeMode} />
            <ContributorsPage />
            <Footer />
          </Route>
          <Route path="/gradient_generator" exact>
            <ToastContainer limit={2} />
            <Header rotate={rotate} changeMode={changeMode} />
            <GradientGenerator />
            <Footer />
          </Route>
          <Route path="/saved" exact>
            <ToastContainer limit={2} />
            <Header rotate={rotate} changeMode={changeMode} />
            <SavedGradients
              align={align}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
            <Footer />
          </Route>
          <Route path="/contributors" exact>
            <Header rotate={rotate} changeMode={changeMode} />
            <ContributorsPage />
            <Footer />
          </Route>
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
