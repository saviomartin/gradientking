import "./styles/App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { Home } from "./core";

const App = () => {
  return (
    <div className="bg-[#f5effc] min-h-screen">
      <Router>
        <Header />
        <div className="pt-20">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
