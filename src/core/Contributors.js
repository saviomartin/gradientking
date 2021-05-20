import React, { useEffect, useState } from "react";

import axios from "axios"; //axios

// components
import { Card } from "../components";

const Contributors = () => {
  const [data, setData] = useState([]);

  const fetchContributors = () => {
    axios
      .get(
        "https://api.github.com/repos/saviomartin/gradientking/contributors",
        {
          headers: {},
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  return (
    <div className="w-full h-full flex justify-center flex-wrap dark:bg-[#333333]">
      {data.map((contributor, key) => (
        <Card contributor={contributor} key={key} />
      ))}
    </div>
  );
};

export default Contributors;
