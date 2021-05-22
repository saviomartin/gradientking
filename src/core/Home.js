import React, { useEffect, useState } from "react";

// firestore
import { db } from "../backend";

// components
import { Gradient } from "../components";

const Home = ({
  user,
  align,
  savedGradients,
  setSavedGradients,
  searchText,
  setOpen,
  sort,
}) => {
  const [gradients, setGradients] = useState([]);

  useEffect(() => {
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
            setGradients(data.sort(myAbcSort));
          } else {
            setGradients(data);
          }
        });

      // despatch
      return unsubscribe;
    }
  }, [sort]);

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
              setOpen={setOpen}
              savedGradients={savedGradients}
              setSavedGradients={setSavedGradients}
            />
          );
        })}
    </div>
  );
};

export default Home;
