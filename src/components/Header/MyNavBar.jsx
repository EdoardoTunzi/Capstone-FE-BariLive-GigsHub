import { useEffect, useState } from "react";
import "./MyNavBar.css";
import { Alert, Button, Container, Form, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToToken, addToUser } from "../../redux/actions/actions";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const MyNavBar = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setUsername("");
    setPassword("");
    setError(null);
    setShow(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      dispatch(addToToken(data.token));
      fetchUserDetails(data.token); // Salva nel Redux Store
      handleClose(); //chiude modale
      setUsername("");
      setPassword("");
      setLoggedIn(true); // Attiva il redirect nel useEffect
    } catch (error) {
      setError(error.message); // Mostra il messaggio di errore nel form
    } finally {
      setIsLoading(false);
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
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn && user) {
      setTimeout(() => {
        navigate("/myhub"); // reindirizzo alla pagina myhub dopo mezzo secondo dal login e aspetto che user sia disponibile in redux
        setLoggedIn(false); // Reset dello stato login per evitare loop nel reindirizzamento e permettere accesso a home
      }, 500);
    }
  }, [loggedIn, user, navigate]);

  return (
    <>
      <header>
        <Navbar expanded={expanded} className="navbarCustom" expand="md" bg="black" data-bs-theme="dark" fixed="top">
          <Container className="py-2 px-md-0">
            <Navbar.Brand className="me-5">
              <Link to={"/"}>
                <img src="/src/assets/logoBianco.png" alt="BariLive logo" style={{ width: 180 }} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="basic-navbar-nav" className="me-0">
              <Nav className=" text-center text-md-start me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
                <Nav.Link as={Link} to={"/"} className="text-white me-2" onClick={() => setExpanded(false)}>
                  HOME
                </Nav.Link>
                <Nav.Link as={Link} to={"/eventi"} className="text-white me-2" onClick={() => setExpanded(false)}>
                  EVENTI
                </Nav.Link>
                <Nav.Link as={Link} to={"/artisti"} className="text-white me-2" onClick={() => setExpanded(false)}>
                  ARTISTI
                </Nav.Link>
                {user && user.ruolo == "ADMIN" && (
                  <Nav.Link as={Link} to={"/backoffice"} className="text-white me-2" onClick={() => setExpanded(false)}>
                    BACKOFFICE
                  </Nav.Link>
                )}
              </Nav>
              {user ? (
                <div className="mt-3 pt-1 pt-md-0 mt-md-0">
                  <div className="my-5 my-md-0 ms-auto d-flex align-items-center justify-content-center gap-2 ">
                    <Button className="border rounded-pill fw-semi-bold px-4" variant="light" as={Link} to={"/myhub"} onClick={() => setExpanded(false)}>
                      My HUB{" "}
                    </Button>
                    <div
                      className="rounded-circle border border-white border-2 overflow-hidden d-flex align-items-center justify-content-center"
                      style={{ width: 50, height: 50 }}
                    >
                      <img className="w-100 h-100 object-fit-cover" src={user.avatar} alt="avatar del profilo utente" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Button
                    className="my-4 my-md-0 ms-auto border rounded-pill fw-semi-bold px-4"
                    variant="light"
                    onClick={() => {
                      setExpanded(false);
                      handleShow();
                    }}
                  >
                    LOGIN
                  </Button>
                </div>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* MODALE LOGIN */}

      <Modal show={show} onHide={handleClose} centered>
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
                type={showPassword ? "text" : "password"}
                required
              />
              <span className="outline-secondary d-inline-block btn-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {showPassword ? "Nascondi password" : "Mostra password"}
              </span>
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
          <Button variant="dark" type="submit" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Caricamento..." : "LOGIN"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyNavBar;
