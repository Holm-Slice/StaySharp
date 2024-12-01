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
import ContactForm from "./components/ContactForm/ContactForm";

const images = [
  "/assets/Images/chef-knife1.jpg",
  "/assets/Images/chef-knife2.jpg",
  "/assets/Images/chef-knife3.jpg",
];

function App() {
  return (
    <div className="main-app-div">
      <Navbar />
      <HorizontalScroller />
      <VideoPlayer />
      {/* <HorizontalScroller /> */}
      <Section id="home" title="HOME" className="section-spacing">
        <div className="home-cont">
          <h1>
            We sharpen knives, fix chipped knives, and even sell knives in
            Austin Texas
          </h1>{" "}
        </div>
      </Section>
      <Section id="about" title="ABOUT" className="section-spacing">
        <div className="about-cont">
          <div>
            <img
              className="about-img"
              src="assets/Images/chris at pop up.jpeg"
              alt=""
            />
          </div>
          <div className="centered-container">
            <h2 className="bio-copy"> About us!</h2>
            <p className="bio-copy">
              Stay Sharp ATX, believes that a well-honed blade is the heart of
              every great kitchen. Founded by a seasoned veteran of the food and
              beverage industry, our company is built on a foundation of
              passion, precision, and a deep appreciation for the craft of
              cooking. With decades of experience working in renowned kitchens
              around the globe, our founder has witnessed firsthand the
              transformative power of a perfectly sharpened knife.
            </p>
            <p className="bio-copy">
              Our journey began in some of the world’s most celebrated
              restaurants, where the pursuit of excellence was not just a goal
              but a way of life. From bustling markets in Southeast Asia to
              Michelin-starred establishments in Europe and North America, our
              founder developed an intimate understanding of the tools chefs
              rely on to bring their culinary visions to life. This global
              perspective, paired with years of hands-on expertise, inspired the
              creation of a service that delivers unmatched quality and
              attention to detail.
            </p>
            <p className="bio-copy">
              We are more than just a knife sharpening company—we are a partner
              to chefs, restaurateurs, and home cooks who value their craft.
              Every edge we sharpen is treated with the same care and dedication
              that guided our founder’s culinary journey. Our mission is simple:
              to ensure that your tools are always as sharp as your skills.
              Whether you’re preparing a family meal or crafting a masterpiece
              for discerning diners, we’re here to help you cut through the
              ordinary and stay sharp.
            </p>
          </div>
        </div>
      </Section>
      <ImageCarousel images={images} />
      <Section id="services" title="SERVICES" className="section-spacing">
        {/* <h1>Services:</h1> */}
        <MenuDisplay />
      </Section>
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
