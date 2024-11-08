import { Link, useLocation } from "react-router-dom";
import HorizontalScroller from "../HorizontalScroller/HorizontalScroller";
import "./Navbar.css";

function Navbar() {
  //   const location = useLocation();
  return (
    <>
      {/* <nav className="navbar"> */}
      <div className="navbar-cont">
        <div className="navbar-logo-img">
          <img
            src="src/assets/imgs/logo-PNG/Stay Sharp Logo White.png"
            alt="stay-sharp-dont-be-dull-logo"
          />
        </div>
        {/* <h1>Stay Sharp</h1> */}
        <div className="nav-list">
          <ul>
            <li>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <HorizontalScroller />
      </div>
      {/* </nav> */}
    </>
  );
}

export default Navbar;
