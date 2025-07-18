import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mockKnives } from "../../data/mockKnives";
import CategoryProductGrid from "./CategoryProductGrid";
import StreamlinedFilterBar from "./StreamlinedFilterBar";
import { filterProducts } from "../../utils/filterUtils";
import Navbar from "../Navbar/Navbar";
import HorizontalScroller from "../HorizontalScroller/HorizontalScroller";

function ShopDashboard({
  cart,
  setCart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [knives, setKnives] = useState([]);
  const [filteredKnives, setFilteredKnives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    brand: "all",
    minPrice: "",
    maxPrice: "",
    sortBy: "name",
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === "clear") {
      setFilters({
        search: "",
        category: "all",
        brand: "all",
        minPrice: "",
        maxPrice: "",
        sortBy: "name",
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  // Apply filters whenever filters or knives change
  useEffect(() => {
    const filtered = filterProducts(knives, filters);
    setFilteredKnives(filtered);
  }, [knives, filters]);

  // Close cart handlers (only for mobile overlay, not desktop sidebar)
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // Close cart on scroll - ONLY for mobile overlay
  useEffect(() => {
    const handleScroll = () => {
      // Only close on scroll for mobile when overlay is open
      if (isCartOpen && window.innerWidth < 1024) {
        closeCart();
      }
    };

    if (isCartOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    // Simulate API call with error handling
    const loadKnives = async () => {
      try {
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if we need to reorder products based on selected product
        let orderedKnives = [...mockKnives];
        const selectedProductId = location.state?.selectedProductId;

        if (selectedProductId) {
          const selectedIndex = orderedKnives.findIndex(
            (knife) => knife.id === selectedProductId
          );
          if (selectedIndex > -1) {
            // Move selected product to the front
            const selectedProduct = orderedKnives.splice(selectedIndex, 1)[0];
            orderedKnives.unshift(selectedProduct);
          }
        }

        setKnives(orderedKnives);
        setFilteredKnives(orderedKnives);

        // Scroll to top of page when component loads with selected product
        if (selectedProductId) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error loading knives:", error);
      } finally {
        setLoading(false);
      }
    };

    loadKnives();
  }, [location.state?.selectedProductId]);

  useEffect(() => {
    const filtered = knives.filter(
      (knife) =>
        knife.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        knife.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        knife.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
        knife.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredKnives(filtered);
  }, [searchQuery, knives]);

  const addToCart = (knife) => {
    try {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === knife.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === knife.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...knife, quantity: 1 }];
      });

      // Show cart when item is added
      if (!isCartOpen) {
        setIsCartOpen(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    // Navigate to unified checkout page with cart items
    navigate("/checkout", {
      state: {
        type: "shop",
        cartItems: cart,
      },
    });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ss_purple"></div>
      </div>
    );
  }

  return (
    <>
      {/* Responsive Navbar */}
      <div
        className={`transition-all duration-300 ${
          cart.length > 0 && isCartOpen ? "lg:pr-80" : ""
        }`}
      >
        <Navbar />
        <HorizontalScroller />
      </div>

      <div className="min-h-screen bg-white relative flex">
        {/* Mobile Cart Overlay (only on mobile) */}
        {isCartOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-[9998] transition-opacity duration-500 lg:hidden"
              onClick={closeCart}
            />
            <div
              className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-[9999] transform transition-transform duration-500 ease-in-out lg:hidden ${
                isCartOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Mobile cart content - same as desktop but with close button */}
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <h2 className="font-title font-bold text-lg text-ss_purple">
                    Cart ({cart.length})
                  </h2>
                  <button
                    onClick={closeCart}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Your cart is empty</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Add some products to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start space-x-2 p-2 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <img
                            src={item.image || "/assets/Images/chef-knife1.jpg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-gray-900 truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              ${item.price}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 bg-ss_purple text-white flex items-center justify-center text-xs hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
                              >
                                −
                              </button>
                              <span className="text-xs font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-6 h-6 bg-ss_purple text-white flex items-center justify-center text-xs hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
                              >
                                +
                              </button>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-red-500 hover:text-red-700 ml-1 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="border-t border-gray-200 p-3 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Total:</span>
                      <span className="text-lg font-bold text-ss_purple">
                        $
                        {cart
                          .reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-ss_purple text-white py-2 text-sm font-medium hover:bg-white hover:text-ss_purple transition-colors duration-300 border-2 border-ss_purple uppercase"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Floating Cart Button for Mobile */}
        <button
          onClick={toggleCart}
          className="fixed bottom-6 right-6 bg-ss_purple text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-[9997] lg:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19v2a2 2 0 11-4 0v-2m0 0V9a2 2 0 112 0v10m0 0h4m-4 0a2 2 0 104 0m0 0v-2a2 2 0 00-2-2H9z"
            />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {cart.length}
            </span>
          )}
        </button>

        {/* Main Shop Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            cart.length > 0 && isCartOpen ? "lg:pr-80" : ""
          }`}
        >
          <div className="seo-text absolute -translate-y-full opacity-0">
            Austin Texas knife shop premium kitchen cutlery sales Japanese
            knives German knives professional knife collection Austin knife
            store kitchen cutlery Austin Texas chef knife sales premium blade
            collection Austin knife experts culinary knives
          </div>

          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Link
                    to="/"
                    className="text-ss_purple hover:text-ss_pale_purple transition-colors flex items-center gap-2 mb-4"
                  >
                    ← Back to Home
                  </Link>
                  <h1 className="text-3xl font-bold text-ss_purple">
                    Stay Sharp Knife Collection
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Premium knives for professional and home chefs
                  </p>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center items-center space-x-4">
                  <div className="max-w-md w-full">
                    <input
                      type="text"
                      placeholder="Search by name, brand, style, or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ss_purple focus:ring-2 focus:ring-ss_purple focus:ring-opacity-20"
                    />
                  </div>

                  {/* Desktop Cart Toggle Button */}
                  {cart.length > 0 && (
                    <button
                      onClick={() => setIsCartOpen(!isCartOpen)}
                      className="hidden lg:flex bg-ss_purple text-white px-4 py-2 rounded-lg hover:bg-white hover:text-ss_purple border-2 border-ss_purple transition-colors items-center space-x-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19v2a2 2 0 11-4 0v-2m0 0V9a2 2 0 112 0v10m0 0h4m-4 0a2 2 0 104 0m0 0v-2a2 2 0 00-2-2H9z"
                        />
                      </svg>
                      <span>
                        {isCartOpen ? "Hide" : "Show"} Cart ({cart.length})
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content - Filters and Products */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ss_purple"></div>
              </div>
            ) : (
              <>
                {/* Streamlined Filter Bar */}
                <StreamlinedFilterBar
                  products={knives}
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />

                {/* Category Products Grid with See More functionality */}
                <CategoryProductGrid
                  products={filteredKnives}
                  onAddToCart={addToCart}
                  groupByCategory={
                    filters.category === "all" &&
                    !filters.search &&
                    filters.brand === "all"
                  }
                  filters={filters}
                />
              </>
            )}
          </main>
        </div>

        {/* Desktop Cart Sidebar - Visible when cart has items AND is open */}
        {cart.length > 0 && isCartOpen && (
          <div className="hidden lg:block fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-[9995]">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-title font-bold text-xl text-ss_purple">
                    Shopping Cart ({cart.length})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <img
                          src={item.image || "/assets/Images/chef-knife1.jpg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">${item.price}</p>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 bg-ss_purple text-white flex items-center justify-center text-sm hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
                            >
                              −
                            </button>

                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 bg-ss_purple text-white flex items-center justify-center text-sm hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
                            >
                              +
                            </button>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 ml-2 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer with Total and Checkout */}
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-ss_purple">
                    $
                    {cart
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-ss_purple text-white py-3 font-medium hover:bg-white hover:text-ss_purple transition-colors duration-300 border-2 border-ss_purple uppercase"
                >
                  Checkout
                </button>

                <button
                  onClick={() => setCart([])}
                  className="w-full bg-gray-100 text-gray-600 py-2 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors duration-300 border border-gray-300 hover:border-red-300"
                >
                  Clear All Items
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShopDashboard;
