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
      {/* <HorizontalScroller id="scroller" /> */}

      <div className="w-full bg-ss_purple text-white flex flex-col sm:flex-row items-center justify-between p-0 ">
        {/* Logo Container */}
        <div className="mb-0">
          <img
            className="h-40 m-12"
            src="/assets/imgs/logo-PNG/Stay Sharp Logo White.png"
            alt="stay-sharp-don't-be-dull-logo"
          />
        </div>

        {/* Navigation List */}
        <div className="nav-list w-full md:w-auto ">
          <ul className="flex flex-row max-sm:flex-row items-center justify-evenly m-0 p-5 mt-40  ">
            <li className="p-0 text-center">
              <a
                href="#home"
                onClick={handleNavClick}
                className="text-white no-underline font-light text-2xl px-0 relative mr-12 "
              >
                Home
                <span className="absolute w-full h-1.25 bg-ss_purple top-1/2 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></span>
              </a>
            </li>
            <li className="p-0 text-center">
              <a
                href="#about"
                onClick={handleNavClick}
                className="text-white no-underline font-light text-2xl px-0 relative mr-12"
              >
                About
                <span className="absolute w-full h-1.25 bg-ss_purple top-1/2 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></span>
              </a>
            </li>
            <li className="p-0 text-center">
              <a
                href="#services"
                onClick={handleNavClick}
                className="text-white no-underline font-light text-2xl px-0 relative mr-12"
              >
                Services
                <span className="absolute w-full h-1.25 bg-ss_purple top-1/2 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></span>
              </a>
            </li>
            <li className="p-0 text-center">
              <a
                href="#contact"
                onClick={handleNavClick}
                className="text-white no-underline font-light text-2xl px-0 relative mr-12"
              >
                Contact
                <span className="absolute w-full h-1.25 bg-ss_purple top-1/2 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
