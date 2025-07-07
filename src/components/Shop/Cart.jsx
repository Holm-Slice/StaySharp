import React from "react";
import PropTypes from "prop-types";

function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8">
      <main className="bg-white border-2 border-ss_purple w-full max-w-xs md:max-w-lg p-4 md:p-8 shadow-[8px_8px_0px_#453393] hover:transition-transform md:hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 overflow-hidden">
        <h2 className="font-title font-bold text-xl md:text-2xl text-center mb-4">
          Shopping Cart ({items.length})
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 border-b border-gray-200 pb-3"
                >
                  <img
                    src={item.image || "/assets/Images/chef-knife1.jpg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-6 h-6 bg-ss_purple text-white flex items-center justify-center hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
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
                      className="w-6 h-6 bg-ss_purple text-white flex items-center justify-center hover:bg-white hover:text-ss_purple border border-ss_purple transition-colors"
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

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-ss_purple">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-ss_purple text-white py-3 font-medium hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple uppercase"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Cart;
