import React, { useEffect, useState } from "react";

// firestore
import { db } from "../backend";

// components
import { Gradient } from "../components";

// creating modal popup
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

// material design
import { Button } from "@material-ui/core";

const Home = ({
  user,
  align,
  savedGradients,
  setSavedGradients,
  searchText,
  signInWithGoogle,
}) => {
  const [gradients, setGradients] = useState([]);
  const [open, setOpen] = useState(false); // used for popup

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("gradients")
        .orderBy("timestamp", "asc")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          // update messages
          const filteredArr = data.reduce((acc, curr) => {
            return acc.includes(curr) ? acc : [...acc, curr];
          }, []);

          setGradients(filteredArr);
        });

      // despatch
      return unsubscribe;
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center flex-wrap dark:bg-[#333333]">
      {gradients // eslint-disable-next-line
        .filter((gradient) => {
          if (searchText === "") {
            return gradient;
          } else if (
            gradient.colors[0].toLowerCase().includes(searchText.toLowerCase())
          ) {
            return gradient;
          } else if (
            gradient.colors[1].toLowerCase().includes(searchText.toLowerCase())
          ) {
            return gradient;
          }
        })
        .map((gradient, key) => {
          return (
            <Gradient
              gradient={gradient}
              key={key}
              user={user}
              align={align}
              setOpen={setOpen}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          );
        })}
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={() => setOpen(false)}
        modal
        children
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <h1 className="Raleway text-3xl font-bold text-center mt-3">
              Please Sign In
            </h1>
            <p className="Raleway mt-1">
              Please Sign In with your Google Account to like a Gradient ❤️
            </p>
            <div
              className="ml-1 items-center bg-[#fff] hover:bg-[#eee] border border-[#ddd] rounded-md relative py-1 dark:bg-[#24292E] dark:border-[#666] my-3 "
              onClick={signInWithGoogle}
            >
              <Button className="track flex twitterBtn">
                <div className="flex items-center justify-center text-sm capitalize text-[#111] duration-300 dark:text-[#eee] Raleway">
                  Sign In With Google
                  <img
                    width="20px"
                    className="ml-2"
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Home;
