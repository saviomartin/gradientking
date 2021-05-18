import { useState, useEffect } from "react";
import "./styles/App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import { Header } from "./components";

// core
import { Home } from "./core";

import firebase from "firebase"; //firebase
import toast, { Toaster } from "react-hot-toast"; // toaster for notifications
import { auth } from "./backend"; // backend
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [align, setAlign] = useState("left");
  const [savedGradients, setSavedGradients] = useLocalStorage("saved", []);

  // storing user
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        toast.success(`${user.displayName} logged in!`);
      } else {
        setUser(null);
        toast.success("logout success!");
      }
    });

    // cleanup
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  // signIn with Google
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  // sign out from all providers
  const signout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#f5effc] min-h-screen">
      <Router>
        <Header
          signInWithGoogle={signInWithGoogle}
          signout={signout}
          user={user}
          align={align}
          setAlign={setAlign}
        />
        <Toaster position="bottom-right" reverseOrder={true} />
        <div className="pt-20">
          <Switch>
            <Route path="/" exact>
              <Home user={user} align={align} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
