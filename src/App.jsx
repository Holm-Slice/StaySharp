import { Routes, Route, Link, Router, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HorizontalScroller from "./components/HorizontalScroller/HorizontalScroller";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ImageCarousel from "./components/Carousel/ImageCarousel";
import ServiceCardSlider from "./components/ServiceCardSlider";
import "./App.css";
import Divider from "./components/Divider/Divider";
import ContactForm from "./components/ContactForm/ContactForm";
import { smoothScroll } from "./smoothScroll";
import About from "./components/About";
import ActiveSlider from "./ActiveSlider";

const images = [
  "/assets/Images/chef-knife1.jpg",
  "/assets/Images/chef-knife2.jpg",
  "/assets/Images/chef-knife3.jpg",
];

function App() {
  const handleScroll = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    smoothScroll(target, 5000); // 4000ms = 4 seconds
  };

  return (
    <div className="main-app-div">
      <Navbar onClick={handleScroll} />
      <HorizontalScroller />
      <VideoPlayer className="max-h-40" />
      <Divider />
      <Section id="home" title="HOME" className="pb-20">
        <div className="flex flex-col mx-10 ">
          <h1 className="flex flex-col text-wrap justify-center align-center text-ss_purple text-4xl pt-10 pb-2 text-center">
            Knives Sharp! Chips Gone! Got Something You're Looking to Buy or
            Sell, We'll Help Ya!
          </h1>
        </div>
      </Section>
      <ActiveSlider />
      <About />
      <ImageCarousel images={images} />
      <Section id="contact" title="CONTACT" className="section-spacing">
        <ContactForm />
      </Section>
    </div>
  );
}

const Section = ({ id, title, children, className }) => (
  <section id={id} className={className}>
    {children}
  </section>
);

export default App;
