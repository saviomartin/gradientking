import React, { useEffect, useState } from "react";
import { db } from "../backend";
import { Gradient } from "../components";
import { generateCategory } from "../helpers/CategoryHelper";

const Category = ({ align, savedGradients, setSavedGradients }) => {
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

  const redGradients = gradients.filter((gradient) => {
    return (
      generateCategory(gradient.colors[0]) === "red" ||
      generateCategory(gradient.colors[1]) === "red"
    );
  });

  return (
    <div className="w-full h-full flex justify-center flex-wrap">
      {redGradients.map((gradient) => (
        <Gradient
          gradient={gradient}
          key={gradient.id}
          align={align}
          savedGradients={savedGradients}
          setSavedGradients={setSavedGradients}
        />
      ))}
    </div>
  );
};

export default Category;
