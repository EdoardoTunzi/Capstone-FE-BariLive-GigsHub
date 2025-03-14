import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import EventoCard from "../../EventoCard/EventoCard";
import "./MostPopularGrid.css";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import { Link } from "react-router-dom";

const MostPopularGrid = () => {
  const [eventi, setEventi] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <Container className="mt-5 p-0">
      <div className="d-flex align-items-start mb-4 border-bottom border-black border-5 pb-3">
        <h2 className="fs-2">Eventi popolari</h2>
        <Button variant="dark" as={Link} to={"/eventi"} className="ms-auto fs-5 bg-black">
          Vedi tutti
        </Button>
      </div>

      <div className="scroll-container px-1">
        <div className="scroll-content d-flex gap-4 ">
          {loading ? <LoadingSpinner /> : eventi && eventi.map((evento) => <EventoCard key={evento.id} evento={evento} />)}
        </div>
      </div>
    </Container>
  );
};
export default MostPopularGrid;
