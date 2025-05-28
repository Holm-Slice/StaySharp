import { useEffect, useState } from "react";
import { smoothScroll } from "../../smoothScroll";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ cartItems = [] }) {
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

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-full bg-ss_purple text-white flex flex-col sm:flex-row items-center justify-between p-0">
      {/* Logo Container */}
      <div className="mb-0 flex justify-center sm:justify-start w-full sm:w-auto">
        <img
          className="h-40 m-12 ml-12"
          src="/assets/imgs/logo-PNG/Stay Sharp Logo White.png"
          alt="stay-sharp-don't-be-dull-logo"
        />
      </div>

      {/* Navigation List - Centered */}
      <div className="nav-list flex-1 flex justify-center h-24">
        <ul className="flex flex-row items-center justify-center p-5 mt-10 uppercase mb-2 space-x-8">
          <li className="p-0 text-center">
            <a
              href="#home"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative hover:text-gray-200 transition-colors"
            >
              Home
            </a>
          </li>
          <li className="p-0 text-center">
            <a
              href="#about"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative hover:text-gray-200 transition-colors"
            >
              About
            </a>
          </li>
          <li className="p-0 text-center">
            <a
              href="#services"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative hover:text-gray-200 transition-colors"
            >
              Services
            </a>
          </li>
          <li className="p-0 text-center">
            <Link
              to="/shop"
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative hover:text-gray-200 transition-colors"
            >
              Shop
            </Link>
          </li>
          <li className="p-0 text-center">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative hover:text-gray-200 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Cart Icon */}
      <div className="mr-12 mb-0 flex items-center">
        <Link to="/shop" className="relative p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 8m2-8v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" 
            />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;