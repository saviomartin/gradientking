import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiGithub, FiLink, FiTwitter } from "react-icons/fi";

const Card = ({ contributor }) => {
  const [data, setData] = useState([]);

  const fetchContributor = () => {
    axios
      .get(`https://api.github.com/users/${contributor.login}`, {
        headers: {},
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchContributor();
  }, []);
  return (
    <div className="p-5 gradient-shadow bg-white m-3 rounded-md transition duration-400 cursor-pointer text-[#222] dark:bg-[#222222] border dark:border-[#444] max-w-[19%]">
      <img
        src={`${contributor.avatar_url}&s=200`}
        alt={contributor.login}
        className="max-h-[200px] rounded-md"
      />
      <h1 className="text-2xl font-bold Raleway mt-1 truncate capitalize dark:text-[#fafafa]">
        {data.name ? data.name : contributor.login}
      </h1>
      <p className="text-xs overflow-ellipsis overflow-hidden h-[36px] Raleway text-[#666]">
        {data.bio ? data.bio : `${contributor.login} loves to Code`}
      </p>
      <div className="flex items-center pt-4">
        <a href={data.html_url} target="_blank" rel="nonrefferer">
          <FiGithub />
        </a>
        {data.twitter_username && (
          <a
            href={`https://twitter.com/${data.twitter_username}`}
            target="_blank"
            rel="nonrefferer"
            className="ml-2"
          >
            <FiTwitter />
          </a>
        )}
        {data.blog && (
          <a
            href={data.blog}
            target="_blank"
            rel="nonrefferer"
            className="ml-2"
          >
            <FiLink />
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
