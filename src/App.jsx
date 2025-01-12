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
      <Divider />
      {/* <HorizontalScroller /> */}
      <Section id="home" title="HOME" className="section-spacing">
        <div className="home-cont">
          <h1 className="header-copy">
            Knives Sharp! Chips Gone! Got Something You're Looking to Buy or
            Sell, We'll Help Ya!{" "}
          </h1>{" "}
          <h2 className="header-copy">...We Do It All!</h2>{" "}
        </div>
      </Section>
      <Divider />

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
            <div className="top-bio-banner"></div>

            <div className="bio-columns">
              <div className="bio-copy-h2">
                <h2> About us!</h2>
              </div>

              <br />
              <section>
                <p className="bio-copy">
                  This story begins like many chef's, in restaurants where the
                  pursuit of excellence was not just a goal, but a way of life.
                  From bustling restaurants in Mexico City, to fine dining
                  establishments in Phoenix, Austin, and Denver. We have
                  developed an intimate understanding and respect of the tools
                  chefs rely on to bring their culinary visions to life. Years
                  of hands-on expertise, inspired the creation of a service that
                  delivers unmatched quality and attention to detail.
                </p>
                <br />
              </section>
              <section>
                <p className="bio-copy">
                  {" "}
                  Stay Sharp ATX, believes that a well-honed blade is the heart
                  of every great kitchen. Founded by a seasoned veteran of the
                  food and beverage industry, our company is built on a
                  foundation of passion, precision, and a deep appreciation for
                  the craft of cooking. With decades of experience working in
                  renowned kitchens around the globe, our founder has witnessed
                  firsthand the transformative power of a perfectly sharpened
                  knife.
                </p>
                <br />
              </section>
              <section>
                <p className="bio-copy">
                  We are more than just a knife sharpening company—we are a
                  partner to chefs, line cooks restaurateurs, and home cooks.
                  Anyone who values their craft and the tools that make it
                  happen. Our mission is simple:
                  <br />
                  to ensure that your tools are always as sharp as your skills.
                  Whether you’re preparing a family meal or crafting a
                  masterpiece for paying customers, we’re here to help you cut
                  through the bs and stay sharp.
                </p>
              </section>
            </div>
          </div>
        </div>
      </Section>
      <Divider />
      <ImageCarousel images={images} />
      <Divider />
      <Section id="services" title="SERVICES" className="section-spacing">
        <Menu />
      </Section>
      <Divider />
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
