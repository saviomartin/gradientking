import { Button } from "@material-ui/core";
import React from "react";

import Popup from "reactjs-popup"; // popup
// creating modal popup
import "reactjs-popup/dist/index.css";

const Modal = ({ open, setOpen, signInWithGoogle }) => {
  return (
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
  );
};

export default Modal;
