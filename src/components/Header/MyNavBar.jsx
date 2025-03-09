import { useState } from "react";
import "./MyNavBar.css";
import { Button, Container, Form, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar className="navbarCustom px-4 py-4 fixed-top" expand="md" bg="black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="me-5">
            <Link to={"/"}>
              <img src="/src/assets/logoBianco.png" alt="BariLive logo" style={{ width: 180 }} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="me-0">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
              <Nav.Link className="text-white me-2" href={"/"}>
                HOME
              </Nav.Link>
              <Nav.Link className="text-white me-2" href="#mettilinkeventi">
                EVENTI
              </Nav.Link>
              <Nav.Link className="text-white me-1" href="#mettilinkartisti">
                ARTISTI
              </Nav.Link>
            </Nav>
            <Button className=" mt-4 mt-md-0 ms-auto border rounded-pill fw-semi-bold fs-5 px-4" variant="light" onClick={handleShow}>
              LOGIN
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MODALE LOGIN */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <img src="/src/assets/mascotteGifWhite.gif" alt="" style={{ width: 60 }} />
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" id="username" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="shadow-black bs-dark-border-subtle" type="password" placeholder="Password" id="password" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" type="submit" onClick={handleClose}>
            LOGIN
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyNavBar;
