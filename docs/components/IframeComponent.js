import React from "react";

const IframeComponent = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const iframeStyle = {
    width: '100%',
    height: '100vh',
  };

  return (
    <div style={containerStyle}>
      <iframe 
        id="kili-c-bob-802-light" 
        src="https://www.kili.so/widget/bob-802"
        frameborder="0"
        name="bot-iframe"
        style={iframeStyle}
      />
    </div>
  );
};

export default IframeComponent;
