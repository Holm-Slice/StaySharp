import { useEffect } from "react";
import { smoothScroll } from "../../smoothScroll";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

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
    <div className="w-full bg-ss_purple text-white flex flex-col lg:flex-row items-center lg:items-end justify-between p-0">
      {/* Logo Container */}
      <div className="mb-0 flex justify-center lg:justify-start w-full lg:w-auto lg:flex-1">
        <img
          className="h-24 sm:h-32 md:h-36 lg:h-40 m-2 sm:m-4 lg:m-8 lg:ml-12 transition-all duration-300 hover:scale-105"
          src="/assets/imgs/logo-PNG/Stay Sharp Logo White.png"
          alt="stay-sharp-don't-be-dull-logo"
        />
      </div>

      {/* Navigation and Cart Container */}
      <div className="flex items-end justify-center lg:justify-end w-full lg:w-auto lg:mr-8">
        {/* Navigation List */}
        <div className="nav-list h-20 sm:h-24 w-full lg:w-auto">
          <ul className="flex flex-row items-end justify-center lg:justify-end p-2 sm:p-5 mt-2 sm:mt-10 uppercase mb-2 overflow-hidden">
            {!isHomePage && (
              <li className="p-0 text-center">
                <Link
                  to="/"
                  className="text-white no-underline font-light text-2xl px-0 relative mr-12"
                >
                  Home
                </Link>
              </li>
            )}

            {!isShopDashboard && (
              <>
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
                  <Link
                    to="/shop"
                    className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12"
                  >
                    Shop
                  </Link>
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
                    href="#contact"
                    onClick={handleNavClick}
                    className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12"
                  >
                    Contact
                  </a>
                </li>
              </>
            )}
            {isShopDashboard && (
              <li className="p-0 text-center">
                <Link
                  to="/shop"
                  className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12"
                >
                  Shop
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <nav className="navbar-cont relative">
        <div className="seo-text">
          Stay Sharp Austin Texas knife sharpening navigation professional kitchen cutlery service 
          Austin blade experts knife restoration Austin knife shop professional knife care Austin 
          Texas culinary knife services kitchen blade sharpening navigation menu
        </div>
      </nav>
    </div>
  );
}

export default Navbar;