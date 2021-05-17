import React, { useEffect, useState } from "react";
import { db } from "../backend";
import { Gradient } from "../components";

const Home = () => {
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
  return (
    <div className="w-full h-full flex justify-center flex-wrap">
      {gradients.map((gradient) => (
        <Gradient gradient={gradient} key={gradient.id} />
      ))}
    </div>
  );
};

export default Home;
