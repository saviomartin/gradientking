import React, { useEffect, useState } from "react";
import { db } from "../backend";
import { Gradient } from "../components";

const Home = ({
  user,
  align,
  savedGradients,
  setSavedGradients,
  searchText,
}) => {
  const [gradients, setGradients] = useState([]);

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
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          );
        })}
    </div>
  );
};

export default Home;
