import React from "react";
import OurFeatured from "../components/OurFeaturedServices/OurFeatured";
import WhyChooseUs from "../components/WhyChooseUs/WhtChooseUs";
import TopBanner from "../components/TopBanner/TopBanner";

function Services() {
  return (
    <div>
      <TopBanner title="Our Services" subtitle="Our Services" />

      <OurFeatured
        title="Our Services"
        description="Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the runway heading towards a
            streamlined cloud solution:"
      />
      <WhyChooseUs />
    </div>
  );
}

export default Services;
