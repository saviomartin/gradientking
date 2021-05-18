import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../backend";

const FullPage = () => {
  const [gradient, setGradient] = useState([]);

  let params = useParams();

  const gradientId = params.id;

  useEffect(() => {
    const getDoc = async (id) => {
      const snapshot = await db.collection("gradients").doc(id).get();
      setGradient(snapshot.data());
    };
    getDoc(gradientId);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1>{JSON.stringify(gradient)}</h1>
    </div>
  );
};

export default FullPage;
