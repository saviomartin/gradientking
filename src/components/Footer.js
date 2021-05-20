import React from "react";

const Footer = () => {
  return (
    <div className="w-full p-5 dark:bg-[#222] flex items-center justify-between">
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
    </div>
  );
};

export default Footer;
