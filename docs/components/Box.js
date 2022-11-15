import React from "react";
import { useHistory } from "react-router-dom";

const Box = ({ name, description, url}) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(url)
  }
  
  return (
    <div className="box" onClick={handleClick}>
      <h1 style={{ fontSize: "20px" }}>{name}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Box;
