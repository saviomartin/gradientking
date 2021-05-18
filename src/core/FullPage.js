import React from "react";
import { useParams } from "react-router";

const FullPage = () => {
  let params = useParams();

  const gradientId = params.id;
  return (
    <div>
      <h1>Full Page {gradientId}</h1>
    </div>
  );
};

export default FullPage;
