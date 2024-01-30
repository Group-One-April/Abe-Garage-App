import React from "react";
import { Link } from "react-router-dom";

function TopBanner({ title, subtitle, image}) {
  return (
    <div>
      <section className="video-section bg2">
        {/* <div
        data-parallax={{ y: 50 }}
        classNameName="sec-bg"
        style={{
          backgroundImage: "assets/images/additionalService.png",
        }}
      ></div> */}

        <div className="auto-container">
          <p className="about_title">{title} </p>
          <div className="banner_title">
            <Link to="/">
              <p className="read-more">Home /</p>
            </Link>
            <p className="services">{subtitle}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopBanner;
