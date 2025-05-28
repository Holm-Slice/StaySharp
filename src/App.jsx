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
import CartPage from "./components/Shop/CartPage";

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
        <Route path="/cart" element={
            <CartPage
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={handleCheckout}
            />
          } />
        <Route path="/" element={
          <div className="main-app-div">
            <HorizontalScroller />

            <main>
              <VideoPlayer className="max-h-40" />
              <Divider />

              <Section id="home" title="HOME" className="pb-20">
                <header className="flex flex-col mx-4 sm:mx-10">
                  <h1 
                    id="home-heading"
                    className="flex flex-col text-wrap justify-center align-center text-ss_purple pt-10 pb-2 text-center uppercase text-2xl sm:text-4xl"
                  >
                    Knives Sharp! Chips Gone!
                  </h1>
                  <h2 className="flex flex-col text-wrap justify-center align-center text-ss_purple text-lg sm:text-xl md:text-4xl pt-10 pb-2 text-center uppercase">
                    Got Something You're Looking to Buy or Sell, We'll Help Ya Straighten It Out!
                  </h2>
                </header>
              </Section>

              <Section id="services" title="SERVICES">
                <h2 className="relative text-2xl sm:text-4xl text-center text-ss_purple cursor-pointer hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-current hover:after:animate-underline">
                  Fixin's
                </h2>
                <ActiveSlider />
              </Section>

              <Shop />
              <About />
              <ImageCarousel images={images} />

              <Section id="contact" title="CONTACT">
                <h2 id="contact-heading" className="sr-only">Contact Us</h2>
                <ContactForm />
              </Section>
            </main>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;