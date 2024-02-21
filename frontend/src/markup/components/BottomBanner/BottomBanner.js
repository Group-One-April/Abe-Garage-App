import React from "react";

function BottomBanner() {
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
        <h5>Working since 1992</h5>
        <h2>
          We are leader <br /> in Car Mechanical Work
        </h2>
        <div className="video-box">
          <div className="video-btn">
            <a
              href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
              className="overlay-link lightbox-image video-fancybox ripple"
            >
              <i className="flaticon-play"></i>
            </a>
          </div>
          <div className="text">
            Watch intro video <br /> about us
          </div>
        </div>
      </div>
    </section>
  );
}

export default BottomBanner;
