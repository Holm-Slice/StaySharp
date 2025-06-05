
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartIcon = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="relative p-2 text-ss_purple hover:text-ss_purple_dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ss_purple focus:ring-offset-2"
        aria-label={`Shopping cart with ${totalItems} items`}
        aria-expanded={isCartOpen}
        aria-haspopup="true"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" 
          />
        </svg>
        {totalItems > 0 && (
          <span 
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            aria-label={`${totalItems} items in cart`}
          >
            {totalItems}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Shopping Cart
            </h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total: ${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/cart"
                      className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Link>
                    <button
                      onClick={() => {
                        onCheckout();
                        setIsCartOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-ss_purple text-white rounded hover:bg-ss_purple_dark transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
