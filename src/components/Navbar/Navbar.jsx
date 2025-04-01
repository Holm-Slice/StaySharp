import { useEffect } from "react";
import "./Navbar.css";

function Navbar() {

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const elementHeight = targetElement.offsetHeight;
      const centerOffset = (windowHeight - elementHeight) / 2;
      const offsetPosition = elementPosition + window.pageYOffset - centerOffset - 26; // Minus 26px to center position to account for sticky horizontal scroller
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full bg-ss_purple text-white flex flex-col sm:flex-row items-end justify-between p-0">
      {/* Logo Container */}
      <div className="mb-0 flex justify-center sm:justify-start w-full sm:w-auto">
        <img
          className="h-40 m-12 ml-12"
          src="/assets/imgs/logo-PNG/Stay Sharp Logo White.png"
          alt="stay-sharp-don't-be-dull-logo"
        />
      </div>

      {/* Navigation List */}
      <div className="nav-list w-full md:w-auto h-24">
        <ul className="flex flex-row max-sm:flex-row items-end justify-evenly p-5 mt-10 uppercase mb-2 overflow-hidden">
          <li className="p-0 text-center">
            <a
              href="#home"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-2xl px-0 relative mr-12"
            >
              Home
            </a>
          </li>
          <li className="p-0 text-center">
            <a
              href="#about"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-2xl px-0 relative mr-12"
            >
              About
            </a>
          </li>
          <li className="p-0 text-center">
            <a
              href="#services"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-2xl px-0 relative mr-12"
            >
              Services
            </a>
          </li>
          <li className="p-0 text-center">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-2xl px-0 relative mr-12"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
