import React, { useState, useEffect } from "react";

export const Container = () => {
  const [isMobile, setIsMobile] = useState(false);
  let viewportWidth = window.innerWidth;

useEffect(() => {
if(viewportWidth <= 703){
    setIsMobile(true)
}

}, viewportWidth)

  const BoxStyle = {
    width: "19rem",
    border: "1px solid black",
    borderRadius: "7px",
    backgroundColor: "#242124",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
    paddingInline: "1em",
    paddingTop: "1em",
    marginBottom: "1em",
    marginRight: "1em",
  };

  const TitleStyle = {
    fontSize: "20px",
  };

  return (
    <div className="container">
      <div style={BoxStyle}>
        <h1 style={TitleStyle}>Auth</h1>
        <p>
          An authentication protocol that can be used to log-in blockchain
          wallets into apps.
        </p>
      </div>
      <div style={BoxStyle}>
        <h1 style={TitleStyle}>Auth</h1>
        <p>
          An authentication protocol that can be used to log-in blockchain
          wallets into apps.
        </p>
      </div>
      <div style={BoxStyle}>
        <h1 style={TitleStyle}>Auth</h1>
        <p>
          An authentication protocol that can be used to log-in blockchain
          wallets into apps.
        </p>
      </div>
      <div style={BoxStyle}>
        <h1 style={TitleStyle}>Auth</h1>
        <p>
          An authentication protocol that can be used to log-in blockchain
          wallets into apps.
        </p>
      </div>
      <div style={BoxStyle}>
        <h1 style={TitleStyle}>Auth</h1>
        <p>
          An authentication protocol that can be used to log-in blockchain
          wallets into apps.
        </p>
      </div>
      <div style={BoxStyle}>
        <h1 style={TitleStyle}>Auth</h1>
        <p>
          An authentication protocol that can be used to log-in blockchain
          wallets into apps.
        </p>
      </div>
    </div>
  );
};

export default Container;
