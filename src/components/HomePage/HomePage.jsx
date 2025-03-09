import { Container } from "react-bootstrap";
import BandGrid from "./BandGrid/BandGrid";
import Hero from "./Hero/Hero";
import MostPopularGrid from "./MostPopularGrid/MostPopularGrid";

const HomePage = () => {
  return (
    <>
      <Container>
        <Hero />
        <BandGrid />
        <MostPopularGrid />
      </Container>
    </>
  );
};

export default HomePage;
