import BandGrid from "./BandGrid/BandGrid";
import Hero from "./Hero/Hero";
import MostPopularGrid from "./MostPopularGrid/MostPopularGrid";

const HomePage = () => {
  return (
    <>
      <Hero />
      <BandGrid />
      <MostPopularGrid />
    </>
  );
};

export default HomePage;
