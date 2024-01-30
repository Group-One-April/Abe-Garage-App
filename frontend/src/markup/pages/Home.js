import React from "react";
import Banner from "../components/Banner/Banner";
import HomeAbout from "../components/HomeAboutUs/HomeAbout";
import OurFeatured from "../components/OurFeaturedServices/OurFeatured";
import QualityService from "../components/QualityService/QualityService";
import BottomBanner from "../components/BottomBanner/BottomBanner";
import HomeContactUs from "../components/HomeContactUs/HomeContactUs";
import WhyChooseUs from "../components/WhyChooseUs/WhtChooseUs";

function Home(props) {
  return (
    <div>
      <Banner />
      <HomeAbout />
      <OurFeatured
        title="Our Featured Services"
        description="We provide a wide range of services to keep your car running smoothly. Our services include:"
      />
      <QualityService />
      <WhyChooseUs />
      <BottomBanner />
      <HomeContactUs />
    </div>
  );
}

export default Home;
