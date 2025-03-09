import { Container, Row, Col } from "react-bootstrap";
import { Heart, MusicNote, SearchHeart, Ticket } from "react-bootstrap-icons";

const ComeSection = () => {
  return (
    <section className="comeFunziona">
      <Container className="my-5  ">
        {/* <h2 className="fs-2 ">Come funziona</h2> */}
        <Row className="gy-4 mt-5 text-center">
          <Col xs={12} md={6} lg={3}>
            <SearchHeart size={50} className="mb-3 " />
            <h5>Trova eventi</h5>
            <p>Cerca concerti per genere, data e location.</p>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Heart size={50} className="mb-3 " />
            <h5>Salva i preferiti</h5>
            <p>Tieni traccia degli eventi che ti interessano.</p>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <MusicNote size={50} className="mb-3 " />
            <h5>Scopri nuove band</h5>
            <p>Esplora il panorama musicale locale.</p>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Ticket size={50} className="mb-3 " />
            <h5>Partecipa ai concerti</h5>
            <p>Non perderti più un evento!</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ComeSection;
