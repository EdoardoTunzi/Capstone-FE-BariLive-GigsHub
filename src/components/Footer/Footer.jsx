import { Col, Container, Nav, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="border-top py-3 my-4 footer">
      <Row className="d-flex flex-wrap justify-content-between align-items-center">
        <Col md={4} className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto">
          <Link to={"/"}>
            <img src="/src/assets/mascotteGifWhite.gif" alt="mascotte gif " style={{ width: 100 }} />
          </Link>
        </Col>

        <Col md={4}>
          <Nav className="justify-content-center">
            <Nav.Item>
              <Nav.Link href={"/"} className="px-2 text-black">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="px-2 text-black">
                Eventi
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" className="px-2 text-black">
                Artisti
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="d-flex justify-content-center mt-2 mb-3">
            <Nav.Link href="#" className="text-black mx-2">
              <Facebook size={24} />
            </Nav.Link>
            <Nav.Link href="#" className="text-black mx-2">
              <Instagram size={24} />
            </Nav.Link>
            <Nav.Link href="#" className="text-black mx-2">
              <Twitter size={24} />
            </Nav.Link>
          </div>
        </Col>

        <Col md={4} className="text-center">
          <p className="mb-0 text-body-secondary">© {currentYear} Bari Live - Gigs Hub</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
