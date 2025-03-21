import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const videoStyle = {
    width: "100%", // Keep the width responsive
    height: "750px", // Adjust the height to make it shorter
    objectFit: "cover", // Ensures the video scales properly
  };

  return (
    <div>
      <video style={videoStyle} autoPlay loop muted>
        <source
          src="/assets/Video/CHRIS-ASMR-VID-SQUARE.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
