import React from "react";

const IframeComponent = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '1200px',
    width: '800px',
  };

  const iframeStyle = {
    width: '100%',
    height: '100%',
    maxWidth: '1200px',
    maxHeight: '800px',
  };

  return (
    <div style={containerStyle}>
      <iframe 
        id="kili-c-bob-802-light" 
        src="https://www.kili.so/widget/kili" 
        frameborder="0"
        name="bot-iframe"
        style={iframeStyle}
      />
    </div>
  );
};

export default IframeComponent;
