import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../backend";
import { Gradient, Loading } from "../components";
import { generateCategory } from "../helpers/CategoryHelper";

const Category = ({
  align,
  savedGradients,
  setSavedGradients,
  setOpen,
  sort,
}) => {
  const [gradients, setGradients] = useState([]);
  const [loading, setLoading] = useState(true);

  let params = useParams();

  // get gradient id from the params
  const categoryName = params.name;

  useEffect(() => {
    setLoading(true);
    const timestampSort = sort === "oldest" ? "asc" : "desc";
    if (db) {
      const unsubscribe = db
        .collection("gradients")
        .orderBy("timestamp", timestampSort)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          // update messages
          function myAbcSort(a, b) {
            if (a.hearts.length > b.hearts.length) {
              return -1;
            } else {
              return 1;
            }
          }

          if (sort === "likes") {
            setLoading(false);
            setGradients(data.sort(myAbcSort));
          } else {
            setLoading(false);
            setGradients(data);
          }
        });

      // despatch
      return unsubscribe;
    }
  }, [sort, categoryName]);

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
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
};

export default Category;
