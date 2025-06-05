import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const videoStyle = {
    width: "100%", // Keep the width responsive
    height: "750px", // Adjust the height to make it shorter
    objectFit: "cover", // Ensures the video scales properly
  };

  return (
    <div className="relative" role="region" aria-label="Professional knife sharpening demonstration video">
      <div className="seo-text">
        Austin Texas knife sharpening demonstration professional blade restoration 
        kitchen cutlery maintenance expert knife care Austin knife sharpening video 
        professional knife services Austin Texas culinary blade sharpening expert
      </div>
      <video 
        style={videoStyle} 
        autoPlay 
        loop 
        muted 
        preload="metadata" 
        poster="/assets/Images/chef-knife1.jpg"
        controls
        aria-label="Professional knife sharpening demonstration by Stay Sharp Austin"
        aria-describedby="video-description"
      >
        <source
          src="/assets/Video/CHRIS-ASMR-VID-SQUARE.mp4"
          type="video/mp4"
        />
        <track kind="captions" src="" srcLang="en" label="English captions" default />
        Your browser does not support the video tag. This video shows a professional knife sharpening demonstration.
      </video>
      <div id="video-description" className="sr-only">
        This video demonstrates professional knife sharpening techniques used by Stay Sharp Austin's expert craftsmen.
      </div>
    </div>
  );
};

export default VideoPlayer;