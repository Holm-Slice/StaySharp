import { useEffect } from "react";
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
    if (target) {
      smoothScroll(target, 800, 80); // 800ms duration, 80px offset
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
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12"
            >
              Services
            </a>
          </li>
          <li className="p-0 text-center">
            <a
              href="#shop"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12"
            >
              Shop
            </a>
          </li>
          <li className="p-0 text-center">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12"
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
