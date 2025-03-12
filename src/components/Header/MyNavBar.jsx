import { useState } from "react";
import "./MyNavBar.css";
import { Alert, Button, Container, Form, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToToken, addToUser } from "../../redux/actions/actions";

const MyNavBar = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Credenziali errate. Riprova.");
      }

      const data = await response.json();
      console.log(data);
      dispatch(addToToken(data.token));
      fetchUserDetails(data.token); // Salva nel Redux Store
      handleClose(); //chiude modale
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error.message); // Mostra il messaggio di errore nel form
    }
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userDetails = await response.json();
        dispatch(addToUser(userDetails));
      } else {
        throw new Error("Errore nel recupero dettagli utente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <Navbar className="navbarCustom" expand="md" bg="black" data-bs-theme="dark">
          <Container>
            <Navbar.Brand className="me-5">
              <Link to={"/"}>
                <img src="/src/assets/logoBianco.png" alt="BariLive logo" style={{ width: 180 }} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="me-0">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
                <Nav.Link as={Link} to={"/"} className="text-white me-2">
                  HOME
                </Nav.Link>
                <Nav.Link as={Link} to={"/eventi"} className="text-white me-2">
                  EVENTI
                </Nav.Link>
                <Nav.Link as={Link} to={"/artisti"} className="text-white ">
                  ARTISTI
                </Nav.Link>
                {user && user.ruolo == "ADMIN" && (
                  <Nav.Link as={Link} to={"/backoffice"} className="text-white ">
                    BACKOFFICE
                  </Nav.Link>
                )}
              </Nav>
              {user ? (
                <div className="text-center text-md-start mt-4 mt-md-0 ms-auto d-flex align-items-center gap-1">
                  <Button className="  border rounded-pill fw-semi-bold fs-5 px-4" variant="light" as={Link} to={"/myhub"}>
                    My HUB{" "}
                  </Button>
                  <div
                    className="rounded-circle border border-white overflow-hidden d-flex align-items-center justify-content-center"
                    style={{ width: 50, height: 50 }}
                  >
                    <img className="w-100 h-100 object-fit-cover" src={user.avatar} alt="avatar del profilo utente" />
                  </div>
                </div>
              ) : (
                <Button className=" mt-4 mt-md-0 ms-auto border rounded-pill fw-semi-bold fs-5 px-4" variant="light" onClick={handleShow}>
                  LOGIN
                </Button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* MODALE LOGIN */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <img src="/src/assets/mascotteGifWhite.gif" alt="" style={{ width: 60 }} />
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="shadow-black bs-dark-border-subtle"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {error && (
          <Alert className="mx-3" variant="danger">
            {error}
          </Alert>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" type="submit" onClick={handleLogin}>
            LOGIN
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyNavBar;
