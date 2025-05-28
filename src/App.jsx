import { Routes, Route, Link, Router, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import HorizontalScroller from "./components/HorizontalScroller/HorizontalScroller";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ImageCarousel from "./components/Carousel/ImageCarousel";
import ServiceCardSlider from "./components/ServiceCardSlider";
import "./App.css";
import Divider from "./components/Divider/Divider";
import ContactForm from "./components/ContactForm/ContactForm";
import { smoothScroll } from "./smoothScroll";
import About from "./components/About/About";
import ActiveSlider from "./ActiveSlider";
import Shop from "./components/Shop/Shop";
import ShopDashboard from "./components/Shop/ShopDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CartPage from './components/Shop/CartPage';
import BookingPage from './components/Booking/BookingPage';

const images = [
  "/assets/Images/chef-knife1.jpg",
  "/assets/Images/chef-knife2.jpg",
  "/assets/Images/chef-knife3.jpg",
];

const Section = ({ id, title, children, className }) => (
  <section id={id} className={className} aria-labelledby={id ? `${id}-heading` : undefined}>
    {children}
  </section>
);

function App() {
  const [cart, setCart] = useState([]);

  const updateQuantity = (knifeId, quantity) => {
    if (quantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== knifeId));
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === knifeId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (knifeId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== knifeId));
  };

  const handleCheckout = async () => {
    try {
      if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        alert('Stripe is not configured yet. Please contact the store owner.');
        return;
      }

      if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
      }

      // For now, just log the checkout attempt
      console.log('Checkout with items:', cart);
      alert('Checkout functionality will be available once Stripe is configured with your API keys.');

    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your checkout. Please try again.');
    }
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    smoothScroll(target, 5000);
  };

  return (
    <BrowserRouter>
      <Navbar 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/shop" element={
          <ShopDashboard 
            cart={cart}
            setCart={setCart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        } />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;