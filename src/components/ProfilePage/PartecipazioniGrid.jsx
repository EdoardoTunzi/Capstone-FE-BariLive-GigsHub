import { Col, Row } from "react-bootstrap";
import EventoCard from "../EventoCard/EventoCard";

const PartecipazioniGrid = ({ titolo, eventi }) => {
  return (
    <div className="mb-4">
      <h2 className="fs-4 border-bottom border-dark border-3 pb-2">
        {titolo} - {eventi.length}
      </h2>
      <Row className="gy-4 mt-3">
        {eventi.length > 0 ? (
          eventi.map((evento) => (
            <Col key={evento.id} lg={3} md={4} sm={6}>
              <EventoCard evento={evento} />
            </Col>
          ))
        ) : (
          <p className="mt-3">Nessun evento trovato.</p>
        )}
      </Row>
    </div>
  );
};

export default PartecipazioniGrid;
