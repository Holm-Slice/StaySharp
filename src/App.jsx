import { Routes, Route, Link, Router, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HorizontalScroller from "./components/HorizontalScroller/HorizontalScroller";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import ImageCarousel from "./components/Carousel/ImageCarousel";
// import Home from "./pages/Home";
// import ServicesOffered from "./pages/ServicesOffered";
// import Contact from "./pages/Contact";
import "./App.css";
import MenuDisplay from "./components/MenuDisplay/MenuDisplay";

const images = [
  "src/assets/Images/chef-knife1.jpg",
  "src/assets/Images/chef-knife2.jpg",
  "src/assets/Images/chef-knife3.jpg",
];

function App() {
  return (
    <div className="main-app-div">
      <Navbar />
      <HorizontalScroller />
      <VideoPlayer />
      {/* <HorizontalScroller /> */}
      <Section id="home" title="HOME" />
      <Section id="about" title="ABOUT">
        <h1>About page comp</h1>{" "}
      </Section>
      <ImageCarousel images={images} />
      <Section id="services" title="SERVICES">
        {/* <h1>Services:</h1> */}
        <MenuDisplay />
      </Section>
      <Section id="contact" title="CONTACT" />
      {/* <Home id="Home" />
        <ServicesOffered />
        <Contact /> */}
    </div>
  );
}

// you can pass the children prop and call it (line 32 as of now {children}), this will now populate any component or code element that is a child of the section tag, but to execute this correctly we need to wrap the child element completely in a section tag ie <section> <child component or whatever/> </section>
const Section = ({ id, title, children }) => (
  <div id={id} className="section">
    <h1>{title}</h1>
    {children}
  </div>
);

export default App;
