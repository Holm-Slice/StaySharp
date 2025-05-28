import { useEffect } from "react";
import { smoothScroll } from "../../smoothScroll";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ cart = [], onUpdateQuantity, onRemoveItem, onCheckout }) {
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
            <Link
              to="/shop"
              className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12"
            >
              Shop
            </Link>
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
          <li className="p-0 text-center relative group">
            <button className="text-white no-underline font-light text-xl sm:text-2xl px-0 relative mr-4 sm:mr-12 flex items-center">
              Cart ({cart.length})
            </button>
            
            {/* Cart Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shopping Cart ({cart.length})
                </h3>
                
                {cart.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <img 
                            src={item.image || '/assets/Images/chef-knife1.jpg'} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">${item.price}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                            >
                              -
                            </button>
                            
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                            >
                              +
                            </button>
                            
                            <button
                              onClick={() => onRemoveItem && onRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold text-ss_purple">
                          ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                        </span>
                      </div>
                      
                      <button
                        onClick={onCheckout}
                        className="w-full bg-ss_purple text-white py-2 rounded-md font-medium hover:bg-ss_pale_purple transition-colors"
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;