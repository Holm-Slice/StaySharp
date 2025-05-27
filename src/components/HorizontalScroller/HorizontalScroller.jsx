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

  return (
    <div
      className={fixed ? "horizontal-scroller fixed" : "horizontal-scroller"}
    >
      <div id="scroller" className="horizontal-scroller" onClick={scrollToTop}>
        <div className="scroll-container">
          <div className="scroll-content">
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Indigo.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />

            {/* color changes to purple (pink) */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Purple.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            {/* color changes to teal */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Teal.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            {/* starting color scheme completely over */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Indigo.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />

            {/* color changes to purple (pink) */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Purple.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            {/* color changes to teal */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Teal.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            {/* starting color scheme completely over */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Indigo.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />

            {/* color changes to purple (pink) */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Purple.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            {/* color changes to teal */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Teal.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            {/* starting color scheme completely over */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Indigo.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />

            {/* color changes to purple (pink) */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Purple.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            {/* color changes to teal */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Teal.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            {/* starting color scheme completely over */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Indigo.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Indigo.png"
              alt="stay-sharp-icon"
              className="scroll-item"
            />

            {/* color changes to purple (pink) */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Purple.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Purple.png"
              className="scroll-item"
            />
            {/* color changes to teal */}
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/wordmark-PNG/Stay Sharp Wordmark Teal.png"
              alt="stay-sharp-wordmark"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
            <img
              src="/assets/imgs/icon-PNG/Stay Sharp Icon Teal.png"
              className="scroll-item"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalScroller;