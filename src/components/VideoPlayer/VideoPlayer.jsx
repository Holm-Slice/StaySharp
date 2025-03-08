import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  return (
    <div className="max-w-full max-h-auto flex justify-center items-center">
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
