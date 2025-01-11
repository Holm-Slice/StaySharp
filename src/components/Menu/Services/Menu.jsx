import React from "react";
import "./Menu.css";

function Menu() {
  return (
    <div>
      <div className="menu-container">
        <h1 className="menu-header">Services Menu</h1>
        <div className="menu-card-container">
          <div className="menu-card">
            <img
              className="services-svg"
              src="public/assets/imgs/SVGs/chef-knife-sharpening-service.svg"
              alt="chef-knife-image"
            />
            <h2>Knife Sharpening</h2>
            <h3>
              Our knife sharpening service is the best around. Local and mail-in
              are live
            </h3>
            <p className="services-offered">
              Western: $1.50 per inch{" "}
              <p>
                <small>This is some smaller text.</small>
              </p>{" "}
              <br />
              Japanese: $2.00 per inch{" "}
              <p>
                <small>This is some smaller text.</small>
              </p>{" "}
              <br />
              Single Bevel: $3.50 per inch
              <p>
                <small>This is some smaller text.</small>
              </p>{" "}
              <br />
              Serrated: $3.00 per inch
              <p>
                <small>This is some smaller text.</small>
              </p>{" "}
              <br />
            </p>
            <a href="#" className="services-btn">
              BOOK NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
