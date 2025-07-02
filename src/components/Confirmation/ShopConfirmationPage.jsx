
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ShopConfirmationPage() {
  const location = useLocation();
  const orderData = location.state?.orderData || {};

  if (!orderData.items || orderData.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393] text-center">
            <h1 className="font-title font-bold text-2xl mb-4">No Order Data Found</h1>
            <Link 
              to="/shop" 
              className="bg-ss_purple text-white px-6 py-3 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const calculateSubtotal = () => {
    return orderData.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  };

  const subtotal = calculateSubtotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white border-2 border-green-500 p-6 mb-8 shadow-[8px_8px_0px_#22c55e] text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="font-title font-bold text-2xl md:text-3xl text-green-600 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          <div className="bg-green-50 border border-green-200 p-3 mt-4 inline-block">
            <div className="flex flex-col space-y-1">
              <div>
                <span className="font-medium text-green-800">Invoice #:</span>
                <span className="ml-2 font-bold text-green-800">
                  {orderData.invoiceNumber || 'INV-' + Date.now().toString().slice(-6)}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-800">Order #:</span>
                <span className="ml-2 font-bold text-green-800">
                  {orderData.orderNumber || `SS-${Date.now().toString().slice(-6)}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-6 text-ss_purple">Order Details</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Customer:</span>
                <span className="font-semibold">{orderData.customerName || 'Customer'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="font-semibold">{orderData.customerEmail || 'customer@email.com'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Invoice Date:</span>
                <span className="font-semibold">{orderData.invoiceDateFormatted || new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Order Date:</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              {orderData.dueDate && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Due Date:</span>
                  <span className="font-semibold">{orderData.dueDate}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Payment Method:</span>
                <span className="font-semibold">**** **** **** {orderData.lastFourDigits || '1234'}</span>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-4">
              <h3 className="font-bold text-lg mb-3 text-ss_purple">Items Ordered:</h3>
              <div className="space-y-3">
                {orderData.items?.map((item, index) => (
                  <div key={index} className="flex items-center p-3 border-2 border-gray-200 bg-gray-50">
                    <img 
                      src={item.image || '/assets/Images/chef-knife1.jpg'} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-6 text-ss_purple">Payment Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Shipping:</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Tax:</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-ss_purple pt-3">
                <div className="flex justify-between">
                  <span className="text-xl font-bold">Total Paid:</span>
                  <span className="text-xl font-bold text-ss_purple">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-4 mb-6">
              <h3 className="font-bold text-blue-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• You'll receive an order confirmation email shortly</li>
                <li>• Your items will be prepared and shipped within 2-3 business days</li>
                <li>• You'll receive tracking information once shipped</li>
                <li>• Estimated delivery: 5-7 business days</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                to="/shop"
                className="w-full bg-ss_purple text-white py-3 px-6 text-center block uppercase font-medium transition-colors duration-[1300ms] border-2 border-ss_purple hover:bg-white hover:text-ss_purple"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="w-full bg-white text-ss_purple py-3 px-6 text-center block uppercase font-medium transition-colors duration-[1300ms] border-2 border-ss_purple hover:bg-ss_purple hover:text-white"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white border-2 border-ss_purple p-6 mt-8 shadow-[8px_8px_0px_#453393]">
          <h3 className="font-bold text-lg mb-3 text-ss_purple">Shipping Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Shipping Address:</h4>
              <div className="text-gray-600">
                <p>{orderData.shippingAddress?.name || 'Customer Name'}</p>
                <p>{orderData.shippingAddress?.street || '123 Main St'}</p>
                <p>{orderData.shippingAddress?.city || 'City'}, {orderData.shippingAddress?.state || 'ST'} {orderData.shippingAddress?.zip || '12345'}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Contact & Support:</h4>
              <div className="text-gray-600">
                <p><span className="font-medium">Phone:</span> (555) 123-4567</p>
                <p><span className="font-medium">Email:</span> orders@staysharp.com</p>
                <p><span className="font-medium">Support:</span> support@staysharp.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopConfirmationPage;
