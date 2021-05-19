import { useState, useEffect } from "react";
import "./styles/App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import { Header } from "./components";

// core
import { FullPage, Generator, Home, SavedGradients } from "./core";

import firebase from "firebase"; //firebase
import toast, { Toaster } from "react-hot-toast"; // toaster for notifications
import { auth } from "./backend"; // backend
import useLocalStorage from "./hooks/useLocalStorage";

const Routes = () => {
  const [align, setAlign] = useState("left");
  const [searchText, setSearchText] = useState("");
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
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Toaster position="bottom-right" reverseOrder={true} />
        <div className="pt-20 h-full w-full min-h-[85vh]">
          <Switch>
            <Route path="/" exact>
              <Home
                user={user}
                align={align}
                savedGradients={savedGradients}
                setSavedGradients={setSavedGradients}
                searchText={searchText}
              />
            </Route>
            <Route path="/saved" exact>
              <SavedGradients
                align={align}
                savedGradients={savedGradients}
                setSavedGradients={setSavedGradients}
              />
            </Route>
            <Route path="/generate" exact>
              <Generator align={align} />
            </Route>
            <Route path="/gradient/:id" exact>
              <FullPage
                align={align}
                savedGradients={savedGradients}
                setSavedGradients={setSavedGradients}
                user={user}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
