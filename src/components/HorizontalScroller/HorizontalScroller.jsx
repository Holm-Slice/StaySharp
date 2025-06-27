import { useState } from "react";
import "./HorizontalScroller.css";

function HorizontalScroller(props) {
  const [fixed, setFixed] = useState(false);

  function setNavbarPosition() {
    if (window.scrollY >= 50) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  window.addEventListener("scroll", setNavbarPosition);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Define the image patterns for the scroll
  const imagePattern = [
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Indigo.png", alt: "stay-sharp-wordmark", title: "stay-sharp-wordmark" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Purple.png", alt: "stay-sharp-wordmark", title: "stay-sharp-wordmark" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Teal.png", alt: "stay-sharp-wordmark", title: "stay-sharp-wordmark" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" },
    { src: "/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png", alt: "stay-sharp-icon", title: "stay-sharp-icon" }
  ];

  // Repeat the pattern to ensure seamless infinite scroll
  const repeatedImages = [
    ...imagePattern, 
    ...imagePattern
  ];

  return (
    <div
      className={fixed ? "horizontal-scroller fixed" : "horizontal-scroller"}
    >
      <div id="scroller" className="horizontal-scroller" onClick={scrollToTop}>
        <div className="scroll-container">
          <div className="scroll-content">
            {repeatedImages.map((image, index) => {
              const isChefIcon = image.src.includes("Stay Sharp Icon Indigo.png") || 
                                image.src.includes("Stay Sharp Icon Teal.png") || 
                                image.src.includes("Stay Sharp Icon Purple.png");
              
              return (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  className={`scroll-item ${isChefIcon ? 'chef-chopping' : ''}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="seo-text">
        Stay Sharp Austin Texas knife sharpening professional kitchen cutlery service 
        Austin blade sharpening expert knife restoration Austin knife care professional 
        knife sharpening service Austin Texas kitchen knife experts culinary blade care
      </div>
    </div>
  );
}

export default HorizontalScroller;