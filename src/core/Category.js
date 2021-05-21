import React, { useEffect, useState } from "react";
import { db } from "../backend";
import { generateCategory } from "../helpers/CategoryHelper";

const Category = () => {
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
    <div>
      {gradients.map((gradient) => (
        <h1 className="text-4xl">{generateCategory(gradient.colors[1])}</h1>
      ))}
    </div>
  );
};

export default Category;
