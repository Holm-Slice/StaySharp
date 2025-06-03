import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { mockKnives } from "../../data/mockKnives";

// Dynamically import Stripe only if the key is available
let stripePromise = null;
if (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  import("@stripe/stripe-js")
    .then(({ loadStripe }) => {
      stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    })
    .catch((error) => {
      console.warn("Stripe failed to load:", error);
      stripePromise = null;
    });
}
  

function ShopDashboard({
  cart,
  setCart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  const location = useLocation();
  const [knives, setKnives] = useState([]);
  const [filteredKnives, setFilteredKnives] = useState([]);
  const [hoveredKnife, setHoveredKnife] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
          const selectedIndex = orderedKnives.findIndex(knife => knife.id === selectedProductId);
          if (selectedIndex > 0) {
            // Move selected product to the front
            const selectedProduct = orderedKnives.splice(selectedIndex, 1)[0];
            orderedKnives.unshift(selectedProduct);
          }
        }
        
        setKnives(orderedKnives);
        setFilteredKnives(orderedKnives);
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
        knife.description.toLowerCase().includes(searchQuery.toLowerCase()),
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
              : item,
          );
        }
        return [...prevCart, { ...knife, quantity: 1 }];
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ss_purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
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

            {/* Search Bar and Cart Container */}
            <div className="flex flex-col items-center space-y-4 w-full">
              {/* Centered Search Bar */}
              <div className="max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search by name, brand, style, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ss_purple focus:ring-2 focus:ring-ss_purple focus:ring-opacity-20"
                />
              </div>

              {/* Cart - Centered */}
              {cart && cart.length > 0 && (
                <div className="max-w-md w-full">
                  <div className="bg-white rounded-lg shadow-md p-4 border w-full">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                      Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items)
                    </h2>

                    {/* Show full cart details if only one unique item type */}
                    {cart.length === 1 ? (
                      <>
                        <div className="space-y-3 mb-4">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-3"
                            >
                              <img
                                src={
                                  item.image || "/assets/Images/chef-knife1.jpg"
                                }
                                alt={item.name}
                                title={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />

                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  ${item.price}
                                </p>
                              </div>

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                >
                                  -
                                </button>

                                <span className="text-sm font-medium w-8 text-center">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                >
                                  +
                                </button>

                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-red-500 hover:text-red-700 ml-2"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-base font-semibold">
                              Total:
                            </span>
                            <span className="text-lg font-bold text-ss_purple">
                              $
                              {cart
                                .reduce(
                                  (sum, item) =>
                                    sum + item.price * item.quantity,
                                  0,
                                )
                                .toFixed(2)}
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
                    ) : (
                      /* Show compact view with "View Cart" button for multiple items */
                      <>
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-600 mb-2">
                            {cart.length} different items in your cart
                          </p>
                          <p className="text-lg font-bold text-ss_purple">
                            Total: $
                            {cart
                              .reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0,
                              )
                              .toFixed(2)}
                          </p>
                        </div>

                        <Link
                          to="/cart"
                          className="w-full bg-ss_purple text-white py-2 rounded-md font-medium hover:bg-ss_pale_purple transition-colors text-center block"
                        >
                          View Cart
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredKnives.map((knife) => (
            <div
              key={knife.id}
              className="flex flex-col justify-center items-center"
            >
              <main className="bg-white border-2 border-ss_purple w-full max-w-lg md:max-w-2xl h-[500px] md:h-[400px] p-6 md:p-10 md:grid md:grid-cols-2 md:gap-8 shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-[1.08] hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-6 overflow-hidden">
                <div
                  className="relative w-full h-48 md:h-full overflow-hidden"
                  onMouseEnter={() => setHoveredKnife(knife)}
                  onMouseLeave={() => setHoveredKnife(null)}
                >
                  <img
                    src={knife.image}
                    alt={knife.name}
                    title={knife.name}
                    className="object-cover w-full h-full"
                  />

                  {/* Hover Popup - Only over image */}
                  {hoveredKnife?.id === knife.id && (
                    <div className="absolute bottom-2 right-2 bg-white border-2 border-ss_purple rounded-lg shadow-lg p-3 z-10 min-w-48">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">
                            Style:
                          </span>
                          <span className="text-ss_purple font-semibold">
                            {knife.style}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">
                            Length:
                          </span>
                          <span className="text-ss_purple font-semibold">
                            {knife.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">
                            Brand:
                          </span>
                          <span className="text-ss_purple font-semibold">
                            {knife.brand}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <section className="flex flex-col h-full justify-between">
                  <div>
                    <h1 className="font-title font-bold text-xl md:text-2xl text-center">
                      {knife.name}
                    </h1>

                    <h2 className="text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center">
                      {knife.description}
                    </h2>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <p className="font-light text-black text-center text-sm md:text-base">
                      ${knife.price}
                    </p>
                    {knife.stock > 0 && knife.stock <= 3 && (
                      <p className="text-orange-500 text-sm">
                        Only {knife.stock} left in stock!
                      </p>
                    )}
                    <button
                      onClick={() => addToCart(knife)}
                      disabled={knife.stock === 0}
                      className={`uppercase py-1 px-6 w-full max-w-48 transition-colors duration-[1300ms] border-4 text-sm md:text-base ${
                        knife.stock === 0
                          ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                          : "bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple"
                      }`}
                    >
                      {knife.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </section>
              </main>
            </div>
          ))}
        </div>

        {filteredKnives.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? `No knives found matching "${searchQuery}"`
                : "No knives available at the moment"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ShopDashboard;
