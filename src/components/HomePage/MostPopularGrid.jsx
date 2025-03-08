import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EventoCard from "../EventoCard/EventoCard";

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
    <>
      <Container fluid className="p-1">
        <h2 className="text-center text-uppercase my-5">Eventi da non perdere</h2>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="justify-content-center gap-4 mb-4">
          {eventi.map((evento) => (
            <Col key={evento.id}>
              <EventoCard evento={evento} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default MostPopularGrid;
