import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  return (
    <div className="max-w-full h-auto">
      <div className="responsive-video">
        <video className="" autoPlay muted loop>
          <source
            src="/assets/Video/CHRIS-ASMR-VID-SQUARE.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
