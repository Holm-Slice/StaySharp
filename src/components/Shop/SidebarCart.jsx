import React from "react";
import PropTypes from "prop-types";

function SidebarCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isOpen,
  onClose,
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 sm:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-title font-bold text-xl text-ss_purple">
              Shopping Cart ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold uppercase transition-colors duration-[1300ms]"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-2">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
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
                          className="w-7 h-7 bg-ss_purple text-white flex items-center justify-center text-sm hover:bg-white hover:text-ss_purple border-4 border-ss_purple transition-colors duration-[1300ms] uppercase"
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
                          className="w-7 h-7 bg-ss_purple text-white flex items-center justify-center text-sm hover:bg-white hover:text-ss_purple border-4 border-ss_purple transition-colors duration-[1300ms] uppercase"
                        >
                          +
                        </button>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2 text-sm uppercase transition-colors duration-[1300ms]"
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

          {/* Footer with Total and Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-center">
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
          )}
        </div>
      </div>
    </>
  );
}

SidebarCart.propTypes = {
  items: PropTypes.array.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SidebarCart;
