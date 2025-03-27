import { Col, Container, Row } from "react-bootstrap";
import { Calendar2Check, CheckSquare, HandThumbsUp, HouseHeart, SearchHeartFill } from "react-bootstrap-icons";
import "./Perche.css";
const PercheSection = () => {
  return (
    <section className=" text-center perche-usare">
      <Container className=" my-5 text-center ">
        <h2 className="text-uppercase mb-5">Scopri il meglio della scena musicale locale su Bari Live</h2>
        <Row className="gy-4 mt-5 ">
          <Col xs={12} md={6} lg={4}>
            <Calendar2Check size={50} className="mb-3 " />
            <h5>Tutti gli eventi in un solo posto</h5>
            <p>Basta cercare eventi tra mille pagine social di mille locali.</p>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <HouseHeart size={50} className="mb-3 " />
            <h5>Supporta la scena musicale locale</h5>
            <p>Rimani aggiornato sulle band che ami e scopri nuove band.</p>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <HandThumbsUp size={50} className="mb-3 " />
            <h5>Interfaccia semplice e veloce</h5>
            <p>Trova subito i concerti che ti interessano. Tieni traccia degli eventi a cui partecipi.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PercheSection;
