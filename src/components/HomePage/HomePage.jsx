import { Container } from "react-bootstrap";
import BandGrid from "./BandGrid/BandGrid";
import Hero from "./Hero/Hero";
import MostPopularGrid from "./MostPopularGrid/MostPopularGrid";
import PicsGridMarquee from "./Marquee/PicsGridMarquee";
import ComeSection from "./ComeSection";
import PercheSection from "./PercheSection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container>
        <PercheSection />
        <MostPopularGrid />
        <ComeSection />
        <BandGrid />
      </Container>
      <PicsGridMarquee />
    </>
  );
};

export default HomePage;
