import React from "react";
import { Link } from "react-router-dom";
// import { TfiEmail } from "react-icons/tfi";
// import { SlPhone } from "react-icons/sl";
// import { CiLocationOn } from "react-icons/ci";

function ContactUs() {
  return (
    <div className="contacts">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.629628728737!2d-81.25866861114501!3d34.6640554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856447116e5fad1%3A0x5cb5d79f6bf8a485!2sAbe&#39;s%20Garage!5e0!3m2!1sen!2set!4v1690794101764!5m2!1sen!2set"
        className="map"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div>
        <div className="adress_title">
          <p>Our Address</p>
        </div>
        <div className="adress_paragraph_text">
          <p>
            Completely synergize resource Professionally <br /> cultivate
            one-to-one customer service.
          </p>
        </div>

        <div className="Contact_us_contacts_links">
          <div className="link_location">
            <Link to="#">
              {/* <CiLocationOn className="icon_right" /> */}
            </Link>
            <div>
              <p className="link_location_name">Address: </p>
              <p className="">54B, Tailstoi Town 5238 MT, La city, IA 522364</p>
            </div>
          </div>
          <div className="link_email">
            <Link to="#">
              {/* <TfiEmail className="icon_right" /> */}
            </Link>
            <div>
              <p className="link_email_name">Email: </p>
              <p className="link_email_address">contact@abeGarage.com</p>
            </div>
          </div>
          <div className="link_phone">
            <Link to="#">
              {/* <SlPhone className="icon_right" /> */}
            </Link>
            <div>
              <p className="link_phone_name">Phone: </p>
              <p className="link_phone_address">
                + 1800 456 7890 / + 1254 897 3654
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
