import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage({ cart, onUpdateQuantity, onRemoveItem }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Link 
              to="/shop" 
              className="text-ss_purple hover:text-ss_pale_purple transition-colors flex items-center gap-2"
            >
              ← Back to Shop
            </Link>
            <h1 className="text-3xl font-bold text-ss_purple">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {totalItems} items in your cart
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8">
            <main className="bg-white border-2 border-ss_purple w-full max-w-xs md:max-w-lg p-4 md:p-8 shadow-[8px_8px_0px_#453393] hover:transition-transform md:hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 overflow-hidden text-center">
              <h2 className="font-title font-bold text-xl md:text-2xl mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some knives to your cart to get started
              </p>
              <Link
                to="/shop"
                className="bg-ss_purple text-white px-6 py-3 font-medium hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple uppercase inline-block"
              >
                Continue Shopping
              </Link>
            </main>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {/* Cart Items */}
            <div className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8 w-full lg:w-2/3">
              <main className="bg-white border-2 border-ss_purple w-full p-4 md:p-8 shadow-[8px_8px_0px_#453393] hover:transition-transform md:hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 overflow-hidden">
                <h2 className="font-title font-bold text-xl md:text-2xl text-center mb-6">
                  Cart Items
                </h2>

                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
                      <img 
                        src={item.image || '/assets/Images/chef-knife1.jpg'} 
                        alt={item.name}
                        title={item.name}
                        className="w-20 h-20 object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.description}
                        </p>
                        <p className="text-lg font-semibold text-ss_purple">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-ss_purple text-white flex items-center justify-center hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
                          >
                            -
                          </button>

                          <span className="text-lg font-medium w-12 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-ss_purple text-white flex items-center justify-center hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-right min-w-20">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8 w-full lg:w-1/3">
              <main className="bg-white border-2 border-ss_purple w-full max-w-xs md:max-w-lg p-4 md:p-8 shadow-[8px_8px_0px_#453393] hover:transition-transform md:hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 overflow-hidden sticky top-4">
                <h2 className="font-title font-bold text-xl md:text-2xl text-center mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-ss_purple">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-ss_purple text-white py-3 font-medium hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple uppercase mb-4"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/shop"
                  className="w-full border-4 border-ss_purple text-ss_purple py-3 font-medium hover:bg-ss_purple hover:text-white transition-colors duration-[1300ms] text-center block uppercase"
                >
                  Continue Shopping
                </Link>
              </main>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;