import { Routes, Route, Link, Router, BrowserRouter } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
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
import CartPage from "./components/Shop/CartPage";
import ProductDetailPage from "./components/Shop/ProductDetailPage";
import BookingPage from "./components/Booking/BookingPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import UnifiedCheckoutPage from "./components/Checkout/UnifiedCheckoutPage";
import ServiceConfirmationPage from "./components/Confirmation/ServiceConfirmationPage";
import ShopConfirmationPage from "./components/Confirmation/ShopConfirmationPage";
// Lazy load route components for better performance
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));

const images = [
  "/assets/Images/chef-knife1.jpg",
  "/assets/Images/chef-knife2.jpg",
  "/assets/Images/chef-knife3.jpg",
];

const Section = ({ id, title, children, className }) => (
  <section
    id={id}
    className={className}
    aria-labelledby={id ? `${id}-heading` : undefined}
  >
    {children}
  </section>
);

function App() {
  const [cart, setCart] = useState([]);

  const updateQuantity = (knifeId, quantity) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== knifeId));
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === knifeId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (knifeId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== knifeId));
  };

  const handleCheckout = async () => {
    try {
      if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        alert("Stripe is not configured yet. Please contact the store owner.");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order data
      const orderData = {
        items: cart,
        orderNumber: `SS-${Date.now().toString().slice(-6)}`,
        customerName: "Customer", // You can collect this from a form
        customerEmail: "customer@email.com", // You can collect this from a form
        lastFourDigits: "1234", // From payment form
      };

      // Clear cart
      setCart([]);

      // Navigate to confirmation page
      window.location.href = `/confirmation/shop?orderData=${encodeURIComponent(JSON.stringify(orderData))}`;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your checkout. Please try again.");
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
      <HorizontalScroller />
      <Routes>
        <Route path="/admin" element={<Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>} />
        <Route path="/booking" element={<Suspense fallback={<div>Loading...</div>}><BookingPage /></Suspense>} />
        <Route path="/checkout" element={<Suspense fallback={<div>Loading...</div>}><CheckoutPage /></Suspense>} />
        <Route path="/unified-checkout" element={<Suspense fallback={<div>Loading...</div>}><UnifiedCheckoutPage /></Suspense>} />
        <Route
          path="/confirmation/service"
          element={<Suspense fallback={<div>Loading...</div>}><ServiceConfirmationPage /></Suspense>}
        />
        <Route path="/confirmation/shop" element={<Suspense fallback={<div>Loading...</div>}><ShopConfirmationPage /></Suspense>} />
        <Route
          path="/shop"
          element={
            <Suspense fallback={<div>Loading...</div>}>
            <ShopDashboard
              cart={cart}
              setCart={setCart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={handleCheckout}
            />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
            <CartPage
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={handleCheckout}
            />
            </Suspense>
          }
        />
        <Route
          path="/shop/product/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
            <ProductDetailPage
              cart={cart}
              setCart={setCart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={handleCheckout}
            />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <div className="main-app-div">
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
                      Got Something You're Looking to Buy or Sell, We'll Help Ya
                      Straighten It Out!
                    </h2>
                  </header>
                </Section>

                <Section id="services" title="SERVICES">
                  <h2 className="relative text-2xl sm:text-4xl text-center text-ss_purple cursor-pointer hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-current hover:after:animate-underline">
                    Fixin's
                  </h2>
                  <ActiveSlider />
                </Section>
                <Divider />
                <ImageCarousel images={images} />

                <About />

                <Section id="contact" title="CONTACT">
                  <h2 id="contact-heading" className="sr-only">
                    Contact Us
                  </h2>
                  <ContactForm />
                </Section>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;