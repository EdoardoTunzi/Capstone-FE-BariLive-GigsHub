import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import EventoCard from "../../EventoCard/EventoCard";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import { Link } from "react-router-dom";

const MostPopularGrid = () => {
  const [eventi, setEventi] = useState([]);
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

  const fetchMostPopularEvents = async () => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8080/eventi/top");
      if (response.ok) {
        let eventi = await response.json();
        if (eventi) {
          setEventi(eventi.content);
        } else {
          console.log("Errore: eventi non trovati");
        }
      } else {
        throw new Error("Error in fetching events data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Quando il fetch è terminato, nasconde lo spinner
    }
  };

  useEffect(() => {
    fetchMostPopularEvents();
  }, []);

  return (
    <Container className="my-5 p-0">
      <div className="d-flex align-items-start mb-4 border-bottom border-black border-5 pb-3">
        <h2 className="fs-2">Eventi popolari</h2>
        <Button variant="dark" as={Link} to={"/eventi"} className="ms-auto fs-5 bg-black">
          Vedi tutti
        </Button>
      </div>

      {loading ? <LoadingSpinner /> : <Slider {...settings}>{eventi && eventi.map((evento) => <EventoCard key={evento.id} evento={evento} />)}</Slider>}
    </Container>
  );
};
export default MostPopularGrid;
