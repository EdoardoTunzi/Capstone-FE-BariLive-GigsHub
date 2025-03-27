import { Col, Row } from "react-bootstrap";
import EventoCard from "../EventoCard/EventoCard";

const PartecipazioniGrid = ({ titolo, partecipazioni, handleReload }) => {
  return (
    <div className="mb-4">
      <h2 className="fs-4 border-bottom border-dark border-3 pb-2">
        {titolo} - {partecipazioni.length}
      </h2>
      <Row className="gy-4 mt-3">
        {partecipazioni.length > 0 ? (
          partecipazioni.map((partecipazione) => (
            <Col key={partecipazione.id} lg={3} md={4} sm={6}>
              <EventoCard titolo={titolo} partecipazione={partecipazione} evento={partecipazione.evento} handleReload={handleReload} />
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
