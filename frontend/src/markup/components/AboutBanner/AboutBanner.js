import React from 'react'

function AboutBanner() {
  return (
    <section className="video-section bg2">
      {/* <div
        data-parallax={{ y: 50 }}
        classNameName="sec-bg"
        style={{
          backgroundImage: "assets/images/additionalService.png",
        }}
      ></div> */}

      <div className="auto-container">
        <p className="about_title">Contact Us </p>
        <div className="banner_title">
          <Link to="/">
            <p className="read-more">Home /</p>
          </Link>
          <p className="services">Contact Us</p>
        </div>
      </div>
    </section>
  );
}

export default AboutBanner