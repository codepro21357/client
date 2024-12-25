import React from "react";
import Hero from "./_home/hero/Hero";
import AboutUs from "@/components/aboutUs/AboutUs";
import WhyInvest from "./_home/whyInvest/WhyInvest";
import OurTeam from "@/components/ourTeam/OurTeam";
import ContactUsBanner from "@/components/contactUsBanner/ContactUsBanner";
import Faq from "@/components/faq/Faq";
import Reviews from "@/components/reviews/Reviews";
import NewsLetter from "@/components/newsLetter/NewsLetter";

const Home = () => {
  return (
    <main>
      <Hero />
      <AboutUs />
      <ContactUsBanner />
      <OurTeam />
      <WhyInvest />
      <Reviews />
      <NewsLetter />
      <Faq size="some" />
    </main>
  );
};

export default Home;
