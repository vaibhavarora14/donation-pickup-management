import React from "react";
import { TopBar, Header, Footer } from "../components/layout";
import {
  HeroSection,
  StatsSection,
  WelcomeSection,
  WhatWeDoSection,
  HowWeWorkSection,
  ConnectEngageHelpSection,
  DonateAlmostAnythingSection,
  SupportCauseSection,
  BrandCollaborationsSection,
  CorporatePartnersSection,
  TestimonialsSection,
  BlogSection,
  ContactFormSection,
  NewsletterSection,
} from "../components/sections";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <TopBar />
      <Header />

      <HeroSection />
      <StatsSection />
      <WelcomeSection />
      <WhatWeDoSection />
      <HowWeWorkSection />
      <ConnectEngageHelpSection />
      <DonateAlmostAnythingSection />
      <SupportCauseSection />
      <BrandCollaborationsSection />
      <CorporatePartnersSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactFormSection />
      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default LandingPage;
