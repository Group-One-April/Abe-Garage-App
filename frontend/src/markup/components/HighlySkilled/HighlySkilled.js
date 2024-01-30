import React from "react";
import highlySkilled from "../../../assets/images/highly_skilled.png";

function HighlySkilled() {
  return (
    <div>
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">
                
                <p className="skill_title">We are highly skilled mechanics <b/>for your car repair</p>
                <div className="">
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </p>
                  <p>
                    Capitalize on low hanging fruit to identify a ballpark value
                    added activity to beta test. Override the digital divide
                    with additional clickthroughs from DevOps. Nanotechnology
                    immersion along the information highway will close the loop
                    on focusing.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="image-box">
                <img src={highlySkilled} alt="" />
                {/* <div className="year-experience" data-parallax='{"y": 30}'><strong>17</strong> years <br />
                                Experience </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HighlySkilled;
