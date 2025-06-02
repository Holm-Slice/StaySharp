import React from "react";
import "./Menu.css";

function Menu() {
  return (
    <div>
      <div className="menu-container">
        <div className="menu-header">
          <h1>Menu of Services </h1>
        </div>

        <div className="menu-card-container">
          <div className="menu-card">
            <h1>Knife Sharpening</h1>
            {/* <br />
            <h3>
              Our knife sharpening service is the best around. Local and mail-in
              are live
            </h3> */}
            <br />
            <p className="services-offered-extras">
              <h2>
                Western Knives: <br /> $1 Per Inch{" "}
              </h2>
              <p>
                <small>Wusthof, Henkel, Etc.</small>
              </p>{" "}
              <br />
              <h2>
                Japanese Knives: <br /> $2 Per Inch{" "}
              </h2>
              <p>
                <small>High Carbon, Custom knives, Double Bevel, Etc.</small>
              </p>{" "}
              <br />
              <h2>
                Single Bevel Knives: <br /> $3.5 Per Inch
              </h2>
              <p>
                <small>Yanagiba, Deba, Usuba, Etc</small>
              </p>{" "}
              <br />
              <h2>
                Rehandling <br />
                15 & Up
              </h2>
              <p>
                <small>Treat Yo Hand To Something Niiiice.</small>
              </p>{" "}
              <br />
            </p>
            <button
              onClick={() => window.open("https://your-shopify-page-url.com", "_blank")}
              className="services-btn"
              style={{ display: 'block !important', visibility: 'visible !important', opacity: '1 !important' }}
            >
              BOOK NOW
            </button>
          </div>
          <div className="menu-card">
            <h1>Knife Repairs</h1>
            <br />

            <p className="services-offered">
              <h2>
                Chip Repair: <br /> $5 & Up
              </h2>
              <p>
                <small>Repair of any chips in the edge</small>
              </p>{" "}
              <br />
              <h2>
                Tip Repair: <br /> $7 % Up{" "}
              </h2>
              <p>
                <small>Repair that tip you broke</small>
              </p>{" "}
              <br />
              <h2>
                Bevel Repair: <br /> $10
              </h2>
              <p>
                <small>Bread Knives, Etc.</small>
              </p>{" "}
              <br />
              <h2>
                Thinning: <br /> $15 & Up
              </h2>
              <p>
                <small>
                  Give your knife a little extra love to keep that edge workin'.
                </small>
              </p>{" "}
              <br />
            </p>
            <button
              onClick={() => window.open("https://your-shopify-page-url.com", "_blank")}
              className="services-btn"
              style={{ display: 'block !important', visibility: 'visible !important', opacity: '1 !important' }}
            >
              BOOK NOW
            </button>
          </div>
          <div className="menu-card">
            <h1>Rando Blades</h1>
            <br />
            <p className="services-offered">
              <h2>
                Shears: <br /> $20
              </h2>
              <p>
                <small>Sharpen Your Kitchen, Hair, or Pruning Device.</small>
              </p>{" "}
              <br />
              <h2>
                Mandolins <br />
                $7
              </h2>
              <p>
                <small>Cut Your Finger Off Again.</small>
              </p>{" "}
              <br />
              <h2>
                Total Restoration <br />
                $50 & Up
              </h2>
              <p>
                <small>This is some smaller text.</small>
              </p>{" "}
              <br />
            </p>
            <button
              onClick={() => window.open("https://your-shopify-page-url.com", "_blank")}
              className="services-btn"
              style={{ display: 'block !important', visibility: 'visible !important', opacity: '1 !important' }}
            >
              BOOK NOW
            </button>
          </div>
          {/* <div className="menu-card">
            <img
              className="services-svg"
              src="public/assets/imgs/SVGs/chef-knife-sharpening-service.svg"
              alt="chef-knife-image"
            />
            <h2>Knife Sharpening</h2>
            <br />
            <h3>
              new descriptions here Our knife sharpening service is the best
            </h3>
            <br />
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;