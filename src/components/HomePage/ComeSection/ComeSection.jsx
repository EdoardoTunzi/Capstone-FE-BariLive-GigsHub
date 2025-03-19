import { Container, Row, Col } from "react-bootstrap";
import { BsBookmarkHeart, BsSearch } from "react-icons/bs";
import { LuHandMetal } from "react-icons/lu";
import { TbMusicSearch } from "react-icons/tb";
import "./Come.css";

const ComeSection = () => {
  return (
    <section className="come-funziona">
      <Container className="my-5 text-center">
        <h2 className="fs-2 mb-5">Registrati per scoprire in modo semplice artisti ed eventi a Bari!</h2>
        <Row className="gy-4 my-5 text-center">
          <Col xs={12} md={6} lg={3}>
            <BsSearch size={50} className="mb-3 " />
            <h5>Trova eventi</h5>
            <p>Cerca concerti per genere, data e location.</p>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <BsBookmarkHeart size={50} className="mb-3 " />
            <h5>Salva i preferiti</h5>
            <p>Tieni traccia degli eventi che ti interessano.</p>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <TbMusicSearch size={50} className="mb-3 " />
            <h5>Scopri nuove band</h5>
            <p>Esplora il panorama musicale locale.</p>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <LuHandMetal size={50} className="mb-3 " />
            <h5>Partecipa ai concerti</h5>
            <p>Non perderti più un evento!</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ComeSection;
