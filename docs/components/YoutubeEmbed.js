import React from 'react'

const YoutubeEmbed = ({ videoId }) => (
  <div className="youtube-embed-container">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Youtube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)

export default YoutubeEmbed
