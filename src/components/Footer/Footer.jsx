import { Col, Container, Nav, Row } from "react-bootstrap";
import { Facebook, Instagram } from "react-bootstrap-icons";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="py-4 mt-4 bg-black text-white">
      <Container className="mt-5">
        <Row className="d-flex flex-wrap justify-content-between align-items-center">
          <Col md={4} className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto">
            <Link to={"/"}>
              <img src="/src/assets/mascotteBlack.gif" alt="mascotte gif " style={{ width: 100 }} />
            </Link>
          </Col>

          <Col md={4}>
            <Nav className="justify-content-center">
              <Nav.Item>
                <Nav.Link as={Link} to={"/"} className="px-2 text-white">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={"/eventi"} className="px-2 text-white">
                  Eventi
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={"/artisti"} className="px-2 text-white">
                  Artisti
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="d-flex justify-content-center mt-2 mb-3">
              <Nav.Link href="https://www.facebook.com" className=" mx-2" target="_blank">
                <Facebook size={24} />
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com" className=" mx-2" target="_blank">
                <Instagram size={24} />
              </Nav.Link>
              <Nav.Link href="https://www.twitter.com" className=" mx-2" target="_blank">
                <FaXTwitter size={24} />
              </Nav.Link>
            </div>
          </Col>

          <Col md={4} className="text-center">
            <p className="mb-0 text-body-white">© {currentYear} Bari Live - Gigs Hub. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
