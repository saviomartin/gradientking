import "./styles/App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components";

const App = () => {
  return (
    <div className="bg-[#f5effc] min-h-screen">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            home
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
