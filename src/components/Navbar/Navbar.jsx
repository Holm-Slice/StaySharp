import { useEffect, useState } from "react";
import HorizontalScroller from "../HorizontalScroller/HorizontalScroller";
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
  return (
    <>
      {/* <HorizontalScroller id="scroller" /> */}
      {/* <nav className="navbar"> */}
      <div className="navbar-cont">
        <div className="navbar-logo-img">
          <img
            src="/assets/imgs/logo-PNG/Stay Sharp Logo White.png"
            alt="stay-sharp-dont-be-dull-logo"
          />
        </div>
        {/* <h1>Stay Sharp</h1> */}
        <div className="nav-list">
          <ul>
            <li>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      {/* </nav> */}
    </>
  );
}

export default Navbar;
