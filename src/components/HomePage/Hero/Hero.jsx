import { Button, Container, Form, Modal } from "react-bootstrap";
import "./Hero.css";
import { useState } from "react";

const Hero = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container fluid className="hero1 ">
        <div className="d-flex justify-content-center align-items-center hero1">
          <div className="text-center p-5">
            <h1 className="display-3 fw-semi-bold text-white">
              <span className="fw-bold text-black">Scopri la scena live di Bari.</span> Tutti i concerti, in un solo posto!
            </h1>
            <div className="p-5">
              <Button variant="dark" className="rounded-3 fs-3 px-4 bg-black" onClick={handleShow}>
                Registrati ora
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <img src="/src/assets/mascotteGifWhite.gif" alt="" style={{ width: 60 }} />
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci nome" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci cognome" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Inserisci username" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Inserisci indirizzo email: example@mail.com" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Inserisci password" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="dark" type="submit" onClick={handleClose}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Hero;
