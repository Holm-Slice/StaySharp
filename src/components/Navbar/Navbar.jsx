import { useEffect, useState } from "react";
import HorizontalScroller from "../HorizontalScroller/HorizontalScroller";
import { smoothScroll } from "../../smoothScroll";
import "./Navbar.css";

function Navbar() {
  useEffect(() => {
    const scroller = document.getElementById("scroller");
    if (!scroller) {
      console.error("Scroller element not found");
      return;
    }

    const handleScroll = () => {
      const scrollerTop = scroller.getBoundingClientRect().top;
      if (scrollerTop <= 0) {
        scroller.classList.add("fixed");
      } else {
        scroller.classList.remove("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleNavClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    smoothScroll(target, 2000); // 4000ms = 4 seconds
  };
  return (
    <>
      {/* <HorizontalScroller id="scroller" /> */}
      {/* <nav className="navbar"> */}
      <div className="navbar-cont">
        <div className="navbar-logo-img">
          <img
            className="navbar-logo-img"
            src="/assets/imgs/logo-PNG/Stay Sharp Logo White.png"
            alt="stay-sharp-dont-be-dull-logo"
          />
        </div>
        {/* <h1>Stay Sharp</h1> */}
        <div className="nav-list">
          <ul>
            <li>
              <a href="#home" onClick={handleNavClick}>
                Home
              </a>
              <a href="#about" onClick={handleNavClick}>
                About
              </a>
              <a href="#services" onClick={handleNavClick}>
                Services
              </a>
              <a href="#contact" onClick={handleNavClick}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* </nav> */}
    </>
  );
}

export default Navbar;
