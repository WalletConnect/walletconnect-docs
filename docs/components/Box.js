import React from "react";

const Box = ({ name, description}) => {
  return (
    <div className="box">
      <h1 style={{ fontSize: "20px" }}>{name}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Box;
