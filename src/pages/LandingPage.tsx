import Footer from "../components/Footer";
import Header from "../components/generics/Header";
import AboutUs from "../components/main/AboutUs";
import BestSellers from "../components/main/BestSellers";
import GetInTouch from "../components/main/GetInTouch";
import HeroSection from "../components/main/HeroSection";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <BestSellers />
        <AboutUs />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
