import React from "react";
import TopBanner from "../components/TopBanner/TopBanner";
import HomeContactUs from "../components/HomeContactUs/HomeContactUs";
import ContactUs from "../components/ContactUs/ContactUs"

function Contact() {
  return (
    <div>
      <TopBanner title="Contact Us" subtitle="Contact Us" />

      <ContactUs />
      <HomeContactUs />
    </div>
  );
}

export default Contact;
