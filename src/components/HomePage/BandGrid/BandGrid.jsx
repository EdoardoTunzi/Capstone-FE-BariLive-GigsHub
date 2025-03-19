import { useEffect, useState } from "react";
import BandCard from "../../BandCard/BandCard";
import { Button, Container } from "react-bootstrap";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const BandGrid = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Mostra 2 card già da iPad mini
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const fetchBands = async () => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8080/bands");
      if (response.ok) {
        let bands = await response.json();
        if (bands) {
          setBands(bands.content);
        } else {
          console.log("Error: data not found");
        }
      } else {
        throw new Error("Error in fetching bands data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Quando il fetch è terminato, nasconde lo spinner
    }
  };

  useEffect(() => {
    fetchBands();
  }, []);

  return (
    <Container className="p-0 mb-5">
      <div className="d-flex align-items-start mb-4 border-bottom border-black border-5 pb-3">
        <h2 className="fs-2">Artisti del momento</h2>
        <Button variant="dark" as={Link} to={"/artisti"} className="ms-auto fs-5 bg-black">
          Vedi tutti
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Slider {...settings} className="carousel-container">
          {bands &&
            bands
              .slice(0, 10)
              .sort((a, b) => b.id - a.id)
              .map((band) => <BandCard key={band.id} band={band} />)}
        </Slider>
      )}{" "}
    </Container>
  );
};
export default BandGrid;
