import { Routes, Route, Link, Router, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HorizontalScroller from "./components/HorizontalScroller/HorizontalScroller";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ImageCarousel from "./components/Carousel/ImageCarousel";
import Menu from "./components/Menu/Services/Menu";
// import Home from "./pages/Home";
// import ServicesOffered from "./pages/ServicesOffered";
// import Contact from "./pages/Contact";
import "./App.css";
import Divider from "./components/Divider/Divider";
import ContactForm from "./components/ContactForm/ContactForm";
import ServiceCardTailwind from "./components/ServiceCardTailwind/ServiceCardTailwind";
import { smoothScroll } from "./smoothScroll";
import About from "./components/About";

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
      {/* <Divider /> */}
      <HorizontalScroller />
      <VideoPlayer />
      <Divider />
      {/* <HorizontalScroller /> */}
      <Section id="home" title="HOME" className="pb-20">
        <div className="flex flex-col">
          <h1 className="flex flex-col text-wrap justify-center align-center text-ss_purple text-4xl pt-10 pb-6 text-center">
            Knives Sharp! Chips Gone! Got Something You're Looking to Buy or
            Sell, We'll Help Ya!{" "}
          </h1>{" "}
          <h2 className="flex flex-col text-wrap justify-center align-center text-ss_purple text-4xl pt-6 text-center ">
            ...We Do It All!
          </h2>{" "}
        </div>
      </Section>
      <ServiceCardTailwind />

      {/* <Divider />

      <Section id="services" title="SERVICES" className="section-spacing">
        <Menu />
      </Section> */}
      <About />

      <ImageCarousel images={images} />
      {/* <Divider />
      <Section id="services" title="SERVICES" className="section-spacing">
        <Menu />
      </Section> */}

      <Section id="contact" title="CONTACT" className="section-spacing">
        <ContactForm />
      </Section>
      {/* <Home id="Home" />
        <ServicesOffered />
        <Contact /> */}
    </div>
  );
}

// you can pass the children prop and call it (line 32 as of now {children}), this will now populate any component or code element that is a child of the section tag, but to execute this correctly we need to wrap the child element completely in a section tag ie <section> <child component or whatever/> </section>
const Section = ({ id, title, children, className }) => (
  <section id={id} className={className}>
    {/* <h1>{title}</h1> */}
    {children}
  </section>
);

export default App;
