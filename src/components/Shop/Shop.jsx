import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategorizedProductGrid from "./CategorizedProductGrid";
import SidebarCart from "./SidebarCart";
import { mockKnives } from "../../data/mockKnives";
import "./shop.css";

function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Try to fetch from API first, fallback to mock data
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          return;
        }
      } catch {
        console.log("API not available, using mock data");
      }
      
      // Use mock data as fallback
      setProducts(mockKnives);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Even if there's an error, try to use mock data
      setProducts(mockKnives);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Show cart briefly when item is added
    if (!isCartOpen) {
      setIsCartOpen(true);
      setTimeout(() => setIsCartOpen(false), 1500);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
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

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Sidebar Cart */}
      <SidebarCart
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={closeCart}
      />

      {/* Floating Cart Button for Mobile */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 left-6 bg-ss_purple text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-30 md:hidden"
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

      <section id="shop" className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header with Cart Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold text-ss_purple">
                Stay Sharp Store
              </h1>
              <p className="text-gray-600 mt-2">
                Premium knives, tools, and accessories for every kitchen
              </p>
            </div>
            
            {/* Desktop Cart Toggle Button */}
            <button
              onClick={toggleCart}
              className="hidden md:flex bg-ss_purple text-white px-6 py-3 rounded-lg hover:bg-white hover:text-ss_purple border-2 border-ss_purple transition-colors items-center space-x-2"
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
              <span>Cart ({cart.length})</span>
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ss_purple"></div>
            </div>
          ) : (
            /* Categorized Products */
            <CategorizedProductGrid products={products} onAddToCart={addToCart} />
          )}
        </div>
      </section>
    </>
  );
}

export default Shop;
