import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Leaderboard from "../components/Leaderboard";
import MarketingCarousel from "../components/MarketingCarousel";


function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <MarketingCarousel />
        <Leaderboard />
        <Contact />
      </main>
      <Footer />
    </>
  );
}


export default HomePage

