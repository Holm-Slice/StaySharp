import { useEffect } from "react";
import { smoothScroll } from "../../smoothScroll";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";

function Navbar({ cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const location = useLocation();
  const isShopDashboard = location.pathname === "/shop";
  const isHomePage = location.pathname === "/";
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
    <div className="navbar-cont flex items-center justify-between px-4 md:px-8 py-4 bg-white relative z-50">
      <nav className="w-full" role="navigation" aria-label="Main navigation">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Logo Section */}
          <div className="navbar-logo-img flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center" aria-label="Stay Sharp Austin homepage">
              <img
                className="h-24 md:h-32 w-auto"
                src="/assets/imgs/logo-PNG/Stay Sharp Logo Purple.png"
                alt="Stay Sharp Austin - Professional Knife Sharpening Service"
                loading="eager"
                decoding="sync"
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="nav-list flex items-center">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-lg font-medium" role="menubar">
              <li role="none">
                <Link
                  to="/"
                  onClick={handleScroll}
                  className="text-ss_purple hover:text-ss_purple_dark transition-colors duration-200 px-3 py-2 relative focus:outline-none focus:ring-2 focus:ring-ss_purple focus:ring-offset-2"
                  role="menuitem"
                  aria-label="Navigate to home page"
                >
                  HOME
                </Link>
              </li>
              <li role="none">
                <a
                  href="#services"
                  onClick={handleScroll}
                  className="text-ss_purple hover:text-ss_purple_dark transition-colors duration-200 px-3 py-2 relative focus:outline-none focus:ring-2 focus:ring-ss_purple focus:ring-offset-2"
                  role="menuitem"
                  aria-label="Navigate to services section"
                >
                  SERVICES
                </a>
              </li>
              <li role="none">
                <Link
                  to="/shop"
                  className="text-ss_purple hover:text-ss_purple_dark transition-colors duration-200 px-3 py-2 relative focus:outline-none focus:ring-2 focus:ring-ss_purple focus:ring-offset-2"
                  role="menuitem"
                  aria-label="Navigate to shop page"
                >
                  SHOP
                </Link>
              </li>
              <li role="none">
                <a
                  href="#about"
                  onClick={handleScroll}
                  className="text-ss_purple hover:text-ss_purple_dark transition-colors duration-200 px-3 py-2 relative focus:outline-none focus:ring-2 focus:ring-ss_purple focus:ring-offset-2"
                  role="menuitem"
                  aria-label="Navigate to about section"
                >
                  ABOUT
                </a>
              </li>
              <li role="none">
                <a
                  href="#contact"
                  onClick={handleScroll}
                  className="text-ss_purple hover:text-ss_purple_dark transition-colors duration-200 px-3 py-2 relative focus:outline-none focus:ring-2 focus:ring-ss_purple focus:ring-offset-2"
                  role="menuitem"
                  aria-label="Navigate to contact section"
                >
                  CONTACT
                </a>
              </li>
              <li role="none">
                <CartIcon 
                  cart={cart} 
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                  onCheckout={onCheckout}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;