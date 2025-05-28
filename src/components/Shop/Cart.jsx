
function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Shopping Cart ({items.length})
      </h2>
      
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map(item => (
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
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                  >
                    -
                  </button>
                  
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
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
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-ss_purple">
                ${total.toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={onCheckout}
              className="w-full bg-ss_purple text-white py-3 rounded-md font-medium hover:bg-ss_pale_purple transition-colors"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
