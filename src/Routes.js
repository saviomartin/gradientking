import { useState, useEffect } from "react";

// css
import "./styles/App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import { CategoryBanner, Footer, Header, Modal } from "./components";

// core
import {
  Category,
  Contributors,
  FullPage,
  Generator,
  Home,
  SavedGradients,
} from "./core";

import firebase from "firebase"; //firebase
import { auth } from "./backend"; // backend

import toast, { Toaster } from "react-hot-toast"; // toaster for notifications

// custom hook
import useLocalStorage from "./hooks/useLocalStorage";

const Routes = () => {
  // sorting
  const [sort, setSort] = useState("likes");

  // dark mode
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const [open, setOpen] = useState(false); // used for popup

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
      await toast.success("logout success!");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode && "dark"}`}>
      <Router>
        <Header
          signInWithGoogle={signInWithGoogle}
          signout={signout}
          user={user}
          align={align}
          setAlign={setAlign}
          searchText={searchText}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setSearchText={setSearchText}
        />
        <Toaster position="bottom-right" reverseOrder={true} />
        <Modal
          open={open}
          setOpen={setOpen}
          signInWithGoogle={signInWithGoogle}
        />
        <div className="pt-20 pb-8 h-full w-full bg-[#f5effc] min-h-screen dark:bg-[#333]">
          <Switch>
            <Route path="/" exact>
              <CategoryBanner setSort={setSort} sort={sort} />
              <Home
                user={user}
                align={align}
                setOpen={setOpen}
                sort={sort}
                savedGradients={savedGradients}
                setSavedGradients={setSavedGradients}
                signInWithGoogle={signInWithGoogle}
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
                setOpen={setOpen}
              />
            </Route>
            <Route path="/contributors" exact>
              <Contributors />
            </Route>
            <Route path="/category/:name" exact>
              <CategoryBanner sort={sort} setSort={setSort} />
              <Category
                align={align}
                savedGradients={savedGradients}
                setOpen={setOpen}
                setSavedGradients={setSavedGradients}
              />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default Routes;
