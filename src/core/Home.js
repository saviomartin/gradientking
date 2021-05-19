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
          setGradients(data);
        });

      // despatch
      return unsubscribe;
    }
  }, []);

  // const addData = () => {
  //   axios.get("/data.json").then((data) => {
  //     data.data.forEach((gradient) => {
  //       db.collection("gradients").add({
  //         colors: [gradient.colors[0], gradient.colors[1]],
  //         hearts: ["saviomartin2007@gmail.com"],
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       });
  //     });
  //   });
  // };

  return (
    <div className="w-full h-full flex justify-center flex-wrap">
      {gradients
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
              key={gradient.id}
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
