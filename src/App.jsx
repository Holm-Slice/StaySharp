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
      <Divider />
      <HorizontalScroller />

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
      <VideoPlayer />
      <Divider />

      <Section id="services" title="SERVICES" className="section-spacing">
        <Menu />
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
                <h2>Lore...</h2>
              </div>

              <br />
              <section>
                <p className="bio-copy">
                  Yep, That's me. You're probably wondering how I got here...
                  Well It all started about 12 years ago in the back of a pizza
                  shop in Nowhere, Colorado. Well...That's where I started
                  cooking at least, but it was never my plan to end up in this
                  industry. I always thought I would be a designer of some sort,
                  most likely an architect.
                </p>
                <br />
              </section>
              {/* <section>
                <p className="bio-copy"> </p>
                <br />
              </section> */}
              <section>
                <p className="bio-copy">
                  So that is what took me to attend School at Arizona State
                  University. It was while studying architorture there that I
                  realized I would rather be poor in a kitchen than be poor in a
                  studio. So I started cooking at real restaurants, not just
                  slinging pizzas out of my mothers Honda Civic. This took me
                  from Phoenix to California and Mexico back to Colorado and
                  finally to my place of residence today, Austin, TX.
                  <br />
                </p>
              </section>
              <section>
                <p className="bio-copy">
                  {" "}
                  Along the way I fell in love with a subgenre of chef culture,
                  that being the cult of really high end and beautiful kitchen
                  knives, Hours of research and hours spent talking to other
                  knife shop owners has led me to this place today. The still
                  poor owner of a tiny, online sharpening and kitchen knife (and
                  other cooking and dining things) shop. Welcome!
                </p>

                <br />
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
