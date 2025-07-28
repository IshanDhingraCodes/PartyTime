import React from "react";
import Hero from "../components/user/Hero";
import FeaturedDecorations from "../components/user/FeaturedDecorations";
import CategoryShowcase from "../components/user/CategoryShowcase";
import About from "../components/user/About";
import CallToAction from "../components/user/CallToAction";
import SectionDivider from "../components/ui/section-divider";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedDecorations />
      <SectionDivider variant="curveInverted" color="primary" height="h-16" />
      <CategoryShowcase />
      <SectionDivider variant="curve" color="primary" height="h-16" />
      <CallToAction />
      <About />
    </>
  );
};

export default HomePage;
