import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EventoCard from "../EventoCard/EventoCard";

const EventiPage = () => {
  const [eventi, setEventi] = useState([]);

  const getAllEventi = async () => {
    try {
      const response = await fetch("http://localhost:8080/eventi");

      if (response.ok) {
        let eventi = await response.json();

        if (eventi) {
          console.log(eventi);
          setEventi(eventi.content);
        } else {
          console.log("Errore: nessun evento trovato");
        }
      } else {
        throw new Error("Errore: Problemi nel caricamento degli eventi");
      }
    } catch (error) {
      console.log("Errore nel ricevimento degli eventi non filtrati" + error);
    }
  };

  useEffect(() => {
    getAllEventi();
  }, []);

  return (
    <>
      <Container className="mx-auto px-5 px-sm-0">
        <h1 className="mt-5">Eventi</h1>
        <Row className="gy-4 mt-3 border-top border-black border-4 ">
          {eventi ? (
            eventi.map((evento) => (
              <Col key={evento.id} lg={2} md={3} sm={6} className="">
                <EventoCard evento={evento} />
              </Col>
            ))
          ) : (
            <p>Loading</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default EventiPage;
