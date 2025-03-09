import { Container } from "react-bootstrap";
import BandGrid from "./BandGrid/BandGrid";
import Hero from "./Hero/Hero";
import MostPopularGrid from "./MostPopularGrid/MostPopularGrid";
import PicsGridMarquee from "./Marquee/PicsGridMarquee";

const HomePage = () => {
  return (
    <>
      <Container>
        <Hero />
        <BandGrid />
        <MostPopularGrid />
        <PicsGridMarquee />
      </Container>
    </>
  );
};

export default HomePage;
