import React from "react";
import { useHistory } from "react-router-dom";

const Box = ({ name, description, url }) => {
  let history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    if (url.includes("https://")) {
      window.open(url, "_blank");
    } else {
      history.push(url);
    }
  };

  return (
    <div className="box">
      <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        <h1 style={{ fontSize: "20px" }}>{name}</h1>
        <p>{description}</p>
      </a>
    </div>
  );
};

export default Box;
