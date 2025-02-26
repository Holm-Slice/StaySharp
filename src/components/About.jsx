import React from "react";
import Divider from "./Divider/Divider";

function About() {
  return (
    <>
      <Divider />
      <div className="flex my-8 ">
        <div className="flex flex-row  justify-center align-center text-ss_purple text-xl p-4 m-4 text-center">
          <div>
            <img
              className="about-img"
              src="assets/Images/chris at pop up.jpeg"
              alt=""
            />
          </div>

          <div className="centered-container">
            <div className="top-bio-banner"></div>

            <div className="flex flex-col justify-center align-center text-ss_purple text-xl pt-6 sm:p-12 text-center">
              <div className="flex flex-col justify-center align-center text-ss_purple text-6xl pt-6 text-center sm:p-12 ">
                <h2 className="">Lore...</h2>
              </div>

              <br />

              <section className="sm:line-clamp-2 flex flex-col text-wrap justify-center align-center text-ss_purple text-xl pt-6 text-center">
                <p className="flex flex-col text-wrap justify-center align-center text-ss_purple text-xl pt-6 text-center ">
                  {" "}
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
                <p className="flex flex-col text-wrap justify-center align-center text-ss_purple text-xl pt-6 text-center ">
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
                <p className="flex flex-col text-wrap justify-center align-center text-ss_purple text-xl pt-6 text-center ">
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
      </div>
    </>
  );
}

export default About;
