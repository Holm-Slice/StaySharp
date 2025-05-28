
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Cart from './Cart';

// For now, we'll handle the missing Stripe key gracefully
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || null);

const mockKnives = [
  {
    id: 1,
    name: "Wusthof Classic Chef's Knife",
    brand: "Wusthof",
    style: "German",
    length: "8 inch",
    price: 149.99,
    image: "/assets/Images/chef-knife1.jpg",
    description: "Professional German chef's knife with full tang construction",
    stock: 3
  },
  {
    id: 2,
    name: "Shun Premier Santoku",
    brand: "Shun",
    style: "Japanese",
    length: "7 inch",
    price: 189.99,
    image: "/assets/Images/chef-knife2.jpg",
    description: "Hand-forged Japanese santoku with Damascus steel",
    stock: 2
  },
  {
    id: 3,
    name: "Miyabi Kaizen Gyuto",
    brand: "Miyabi",
    style: "Japanese",
    length: "9.5 inch",
    price: 299.99,
    image: "/assets/Images/chef-knife3.jpg",
    description: "Premium Japanese gyuto with VG10 steel core",
    stock: 1
  },
  {
    id: 4,
    name: "Henckels Pro Paring Knife",
    brand: "Henckels",
    style: "German",
    length: "3.5 inch",
    price: 39.99,
    image: "/assets/Images/chef-knife1.jpg",
    description: "Precision paring knife for detailed work",
    stock: 8
  },
  {
    id: 5,
    name: "Global G-2 Chef's Knife",
    brand: "Global",
    style: "Japanese",
    length: "8 inch",
    price: 119.99,
    image: "/assets/Images/chef-knife2.jpg",
    description: "Lightweight stainless steel Japanese chef's knife",
    stock: 5
  },
  {
    id: 6,
    name: "Zwilling Twin Signature Bread Knife",
    brand: "Zwilling",
    style: "German",
    length: "10 inch",
    price: 89.99,
    image: "/assets/Images/chef-knife3.jpg",
    description: "Serrated bread knife with ice-hardened blade",
    stock: 4
  }
];

function ShopDashboard({ onCartUpdate }) {
  const [knives, setKnives] = useState([]);
  const [filteredKnives, setFilteredKnives] = useState([]);
  const [hoveredKnife, setHoveredKnife] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setKnives(mockKnives);
      setFilteredKnives(mockKnives);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = knives.filter(knife =>
      knife.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      knife.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      knife.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
      knife.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredKnives(filtered);
  }, [searchQuery, knives]);

  // Sync cart with parent component
  useEffect(() => {
    if (onCartUpdate) {
      onCartUpdate(cart);
    }
  }, [cart, onCartUpdate]);

  const addToCart = (knife) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === knife.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === knife.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...knife, quantity: 1 }];
    });
  };

  const removeFromCart = (knifeId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== knifeId));
  };

  const updateQuantity = (knifeId, quantity) => {
    if (quantity === 0) {
      removeFromCart(knifeId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === knifeId ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = async () => {
    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      alert('Stripe is not configured yet. Please contact the store owner.');
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) {
      alert('Stripe failed to load. Please try again.');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Stripe error:', result.error);
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again or contact support.');
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
            <div className="flex items-center justify-between">
              <div>
                <Link 
                  to="/" 
                  className="text-ss_purple hover:text-ss_pale_purple transition-colors flex items-center gap-2"
                >
                  ← Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-ss_purple mt-2">
                  Stay Sharp Knife Collection
                </h1>
                <p className="text-gray-600 mt-1">
                  Premium knives for professional and home chefs
                </p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search by name, brand, style, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ss_purple focus:ring-2 focus:ring-ss_purple focus:ring-opacity-20"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Knife Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredKnives.map(knife => (
            <div
              key={knife.id}
              className="relative"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div 
                  className="aspect-w-1 aspect-h-1 relative"
                  onMouseEnter={() => setHoveredKnife(knife)}
                  onMouseLeave={() => setHoveredKnife(null)}
                >
                  <img 
                    src={knife.image} 
                    alt={knife.name}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Hover Popup - Only over image */}
                  {hoveredKnife?.id === knife.id && (
                    <div className="absolute bottom-2 right-2 bg-white border-2 border-ss_purple rounded-lg shadow-lg p-3 z-10 min-w-48">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Style:</span>
                          <span className="text-ss_purple font-semibold">{knife.style}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Length:</span>
                          <span className="text-ss_purple font-semibold">{knife.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Brand:</span>
                          <span className="text-ss_purple font-semibold">{knife.brand}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {knife.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {knife.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-ss_purple">
                      ${knife.price}
                    </span>
                    
                    <button
                      onClick={() => addToCart(knife)}
                      disabled={knife.stock === 0}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        knife.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-ss_purple text-white hover:bg-ss_pale_purple'
                      }`}
                    >
                      {knife.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                  
                  {knife.stock > 0 && knife.stock <= 3 && (
                    <p className="text-orange-500 text-sm">
                      Only {knife.stock} left in stock!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

            {filteredKnives.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery ? `No knives found matching "${searchQuery}"` : 'No knives available at the moment'}
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <Cart 
              items={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ShopDashboard;
