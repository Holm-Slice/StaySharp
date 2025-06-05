import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const videoStyle = {
    width: "100%", // Keep the width responsive
    height: "750px", // Adjust the height to make it shorter
    objectFit: "cover", // Ensures the video scales properly
  };

  return (
    <div className="relative">
      <div className="seo-text">
        Austin Texas knife sharpening demonstration professional blade restoration 
        kitchen cutlery maintenance expert knife care Austin knife sharpening video 
        professional knife services Austin Texas culinary blade sharpening expert
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover rounded-lg"
        style={{
          maxHeight: '60vh',
          minHeight: '300px'
        }}
        aria-label="Professional knife sharpening demonstration video"
        title="Stay Sharp Austin knife sharpening process"
      >
        <source src="/assets/Video/CHRIS-ASMR-VID-SQUARE.mp4" type="video/mp4" />
        <track kind="descriptions" src="" label="Video shows professional knife sharpening technique" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;