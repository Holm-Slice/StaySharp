import "./VideoPlayer.css";

function VideoPlayer() {
  return (
    <div>
      <div className="video-container">
        <video className="responsive-video" autoPlay muted loop>
          <source
            src="assets/Video/CHRIS-ASMR-VID-SQUARE.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default VideoPlayer;
