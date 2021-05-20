import React from "react";

// material design
import { Button, Tooltip } from "@material-ui/core";
import { FiTwitter } from "react-icons/fi"; // icons

const Footer = () => {
  const twitterLink =
    "https://twitter.com/intent/tweet?text=Check%20out%20gradientking.now.sh%20by%20@SavioMartin7%E2%9A%A1%EF%B8%8F%0D%0A%0ANever%20Again%20run%20out%20of%20Gradients!%20%F0%9F%8E%A8%20Give%20it%20a%20try!%20You%27ll%20love%20it!%20%F0%9F%94%A5%0D%0A%0A%23DEVCommunity%20%23100DaysOfCode%20%23javascript";

  return (
    <div className="w-full px-5 py-3 dark:bg-[#222] flex items-center justify-between">
      <h1 className="text-lg Raleway font-medium text-[#222] dark:text-[#fafafa]">
        Built with 💖 by
        <a
          href="https://twitter.com/saviomartin7"
          className="mx-1 font-extrabold cursor-pointer Raleway hover:text-[#8e54e9] duration-500"
        >
          Savio Martin
        </a>
        and
        <a
          href="/contributors"
          className="ml-1 font-extrabold cursor-pointer Raleway hover:text-[#8e54e9] duration-500"
        >
          Contributors
        </a>
      </h1>
      <div className="flex items-center">
        <Tooltip title="Buy Me A Coffee" arrow>
          <a
            href="https://buymeacoffee.com/saviomartin"
            target="_blank"
            rel="noreferrer"
            className="ml-1 items-center bg-[#24292E] hover:bg-[#222] rounded-md relative cursor-pointer flex"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              className="h-[42px]"
              alt="Buy Me A Coffee"
            />
          </a>
        </Tooltip>
        <Tooltip title="Share to Twitter" arrow>
          <a
            href={twitterLink}
            target="_blank"
            rel="noreferrer"
            className="ml-1 items-center bg-[#1A91DA] hover:bg-[#0F84B4] rounded-md relative cursor-pointer hidden lg:flex py-1"
          >
            <Button className="track flex twitterBtn">
              <div className="flex items-center justify-center text-md text-[#F0E9E2] duration-300 capitalize Raleway font-bold">
                Share on Twitter
                <FiTwitter className="ml-1 text-xl" />
              </div>
            </Button>
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default Footer;
