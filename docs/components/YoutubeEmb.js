import React from 'react'

const YoutubeEmb = ({ videoId }) => (
  <div className="youtube-embed-container" style={{ margin: '30px' }}>
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Youtube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)

export default YoutubeEmb
