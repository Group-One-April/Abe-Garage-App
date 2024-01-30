import React from "react";
import HomeAbout from "../components/HomeAboutUs/HomeAbout";
import BottomBanner from "../components/BottomBanner/BottomBanner";
import HomeContactUs from "../components/HomeContactUs/HomeContactUs";
import WhyChooseUs from "../components/WhyChooseUs/WhtChooseUs";
import HighlySkilled from "../components/HighlySkilled/HighlySkilled";
import TopBanner from "../components/TopBanner/TopBanner";


function About() {
  return (
    <div>
      <TopBanner title="About Us" subtitle="About Us" />
      <HighlySkilled />
      <HomeAbout />
      <WhyChooseUs />
      <BottomBanner />
      <HomeContactUs />
    </div>
  );
}

export default About;
