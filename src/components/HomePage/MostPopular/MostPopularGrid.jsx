import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import EventoCard from "../../EventoCard/EventoCard";
import "./MostPopularGrid.css";

const MostPopularGrid = () => {
  const [eventi, setEventi] = useState([]);

  const fetchMostPopularEvents = async () => {
    try {
      let response = await fetch("http://localhost:8080/eventi/top");
      if (response.ok) {
        let eventi = await response.json();
        if (eventi) {
          console.log(eventi);
          setEventi(eventi.content);
        } else {
          console.log("Error: data not found");
        }
      } else {
        throw new Error("Error in fetching events data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMostPopularEvents();
  }, []);

  return (
    <Container fluid className="p-5">
      <div className="d-flex align-items-start mb-4">
        <h2 className="fs-1">Eventi da non perdere</h2>
        <Button variant="dark" href={"/eventi"} className="ms-auto fs-4">
          Vedi tutti
        </Button>
      </div>

      <div className="scroll-container px-1">
        <div className="scroll-content d-flex gap-4 ">
          {eventi.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      </div>
    </Container>
  );
};
export default MostPopularGrid;
