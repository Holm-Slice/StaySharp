
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { mockKnives } from "../../data/mockKnives";

function ProductDetailPage({ cart, setCart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    // Get product from state or find by ID
    const productFromState = location.state?.product;
    if (productFromState) {
      setProduct(productFromState);
    } else {
      const foundProduct = mockKnives.find(knife => knife.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [id, location.state]);

  const addToCart = () => {
    if (!product) return;
    
    try {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...prevCart, { ...product, quantity }];
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ss_purple"></div>
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === product.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center">
            <Link
              to="/shop"
              className="text-ss_purple hover:text-ss_pale_purple transition-colors flex items-center gap-2 mb-4"
            >
              ← Back to Shop
            </Link>
            <h1 className="text-3xl font-bold text-ss_purple">
              Product Details
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Display */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col justify-center items-center">
            <main className="bg-white border-2 border-ss_purple w-full max-w-lg md:max-w-2xl h-[500px] md:h-[400px] p-6 md:p-10 md:grid md:grid-cols-2 md:gap-8 shadow-[8px_8px_0px_#453393] gap-6 overflow-hidden">
              <div
                className="relative w-full h-48 md:h-full overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  title={product.name}
                  className="object-cover w-full h-full"
                />

                {/* Hover Popup - Only over image */}
                {hoveredProduct?.id === product.id && (
                  <div className="absolute bottom-2 right-2 bg-white border-2 border-ss_purple rounded-lg shadow-lg p-3 z-10 min-w-48">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Style:</span>
                        <span className="text-ss_purple font-semibold">{product.style}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Length:</span>
                        <span className="text-ss_purple font-semibold">{product.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Brand:</span>
                        <span className="text-ss_purple font-semibold">{product.brand}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <section className="flex flex-col h-full justify-between">
                <div>
                  <h1 className="font-title font-bold text-xl md:text-2xl text-center">
                    {product.name}
                  </h1>
                  <h2 className="text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center">
                    {product.description}
                  </h2>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <p className="font-light text-black text-center text-sm md:text-base">
                    ${product.price}
                  </p>
                  {product.stock > 0 && product.stock <= 3 && (
                    <p className="text-orange-500 text-sm">
                      Only {product.stock} left in stock!
                    </p>
                  )}
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-3 my-4">
                    <label className="text-sm font-medium">Quantity:</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={addToCart}
                    disabled={product.stock === 0}
                    className={`uppercase py-1 px-6 w-full max-w-48 transition-colors duration-[1300ms] border-4 text-sm md:text-base ${
                      product.stock === 0
                        ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                        : "bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple"
                    }`}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* Cart Section - styled like services checkout */}
        {cartItem && (
          <div className="flex justify-center mb-8">
            <div className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8">
              <main className="bg-white border-2 border-ss_purple w-full max-w-lg md:max-w-2xl p-6 md:p-8 shadow-[8px_8px_0px_#453393] overflow-hidden">
                <h2 className="font-title font-bold text-xl md:text-2xl text-center mb-6">
                  In Your Cart
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                    <img 
                      src={cartItem.image || '/assets/Images/chef-knife1.jpg'} 
                      alt={cartItem.name}
                      title={cartItem.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {cartItem.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ${cartItem.price} each
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(cartItem.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-lg font-semibold text-ss_purple mb-4">
                      Subtotal: ${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleContinueShopping}
                        className="bg-white text-ss_purple border-2 border-ss_purple px-6 py-3 font-medium hover:bg-ss_purple hover:text-white transition-colors duration-300 uppercase"
                      >
                        Continue Shopping
                      </button>
                      
                      <button
                        onClick={onCheckout}
                        className="bg-ss_purple text-white border-2 border-ss_purple px-6 py-3 font-medium hover:bg-white hover:text-ss_purple transition-colors duration-300 uppercase"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        )}

        {/* Continue Shopping Button - if no cart item */}
        {!cartItem && (
          <div className="flex justify-center">
            <button
              onClick={handleContinueShopping}
              className="bg-ss_purple text-white border-2 border-ss_purple px-8 py-3 font-medium hover:bg-white hover:text-ss_purple transition-colors duration-300 uppercase"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductDetailPage;
