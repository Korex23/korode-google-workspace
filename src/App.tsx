import { Collaborate } from "./compnents/page/Collaborate";
import Create from "./compnents/page/Create";
import { DoMore } from "./compnents/page/DoMore";
import { FAQs } from "./compnents/page/Faqs";
import WorkspaceFooter from "./compnents/page/Footer";
import Gemini from "./compnents/page/Gemini";
import Hero from "./compnents/page/Hero";
import { WorkspaceNavbar } from "./compnents/page/Navbar";
import { NewsletterSignup } from "./compnents/page/Newsletter";
import { SectionTabs } from "./compnents/page/SectionTab";
import Security from "./compnents/page/Security";
import OrgDocsCarousel from "./compnents/page/WhyUs";

function App() {
  return (
    <>
      <header>
        <WorkspaceNavbar />
      </header>
      <section className="overflow-hidden">
        <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 overflow-hidden">
          <Hero />
        </div>
        <div className="flex justify-center items-center">
          <SectionTabs />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 overflow-hidden">
          <Gemini />
          <Create />
          <Collaborate />
          <Security />
        </div>
        <OrgDocsCarousel />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 overflow-hidden">
          <DoMore />
        </div>
        <FAQs />
      </section>
      <footer>
        <NewsletterSignup />
        <WorkspaceFooter />
      </footer>
    </>
  );
}

export default App;
