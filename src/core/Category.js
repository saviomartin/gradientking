import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../backend";
import { Gradient } from "../components";
import { generateCategory } from "../helpers/CategoryHelper";

const Category = ({ align, savedGradients, setSavedGradients, setOpen }) => {
  const [gradients, setGradients] = useState([]);

  let params = useParams();

  // get gradient id from the params
  const categoryName = params.name;

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

  const whiteGradients = gradients.filter((gradient) => {
    return (
      generateCategory(gradient.colors[0]) === "white" ||
      generateCategory(gradient.colors[1]) === "white"
    );
  });
  const yellowGradients = gradients.filter((gradient) => {
    return (
      generateCategory(gradient.colors[0]) === "yellow" ||
      generateCategory(gradient.colors[1]) === "yellow"
    );
  });
  const redGradients = gradients.filter((gradient) => {
    return (
      generateCategory(gradient.colors[0]) === "red" ||
      generateCategory(gradient.colors[1]) === "red"
    );
  });
  const greenGradients = gradients.filter((gradient) => {
    return (
      generateCategory(gradient.colors[0]) === "green" ||
      generateCategory(gradient.colors[1]) === "green"
    );
  });
  const blueGradients = gradients.filter((gradient) => {
    return (
      generateCategory(gradient.colors[0]) === "blue" ||
      generateCategory(gradient.colors[1]) === "blue"
    );
  });
  const blackGradients = gradients.filter((gradient) => {
    return (
      generateCategory(gradient.colors[0]) === "black" ||
      generateCategory(gradient.colors[1]) === "black"
    );
  });

  return (
    <div className="w-full h-full flex justify-center flex-wrap">
      {categoryName === "red"
        ? redGradients.map((gradient) => (
            <Gradient
              gradient={gradient}
              key={gradient.id}
              setOpen={setOpen}
              align={align}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          ))
        : categoryName === "green"
        ? greenGradients.map((gradient) => (
            <Gradient
              gradient={gradient}
              key={gradient.id}
              align={align}
              setOpen={setOpen}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          ))
        : categoryName === "blue"
        ? blueGradients.map((gradient) => (
            <Gradient
              gradient={gradient}
              key={gradient.id}
              align={align}
              setOpen={setOpen}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          ))
        : categoryName === "white"
        ? whiteGradients.map((gradient) => (
            <Gradient
              gradient={gradient}
              key={gradient.id}
              align={align}
              setOpen={setOpen}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          ))
        : categoryName === "yellow"
        ? yellowGradients.map((gradient) => (
            <Gradient
              gradient={gradient}
              key={gradient.id}
              align={align}
              setOpen={setOpen}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          ))
        : blackGradients.map((gradient) => (
            <Gradient
              gradient={gradient}
              key={gradient.id}
              align={align}
              setOpen={setOpen}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          ))}
    </div>
  );
};

export default Category;
