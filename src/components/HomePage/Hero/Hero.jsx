import { Alert, Button, Container, Form, Modal } from "react-bootstrap";
import "./Hero.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Hero = () => {
  //aggiungi user per non mostrare il bottone registrati pe rutente loggato
  const user = useSelector((state) => state.user);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* Per modale */
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setError(null);
    setSuccess(null);
  };
  const handleShow = () => {
    setShow(true);
    setError(null);
    setSuccess(null);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    //controllo che tutti i campi siano compilati
    if (!nome || !cognome || !username || !email || !password) {
      setError("Tutti i campi sono obbligatori.");
      setLoading(false);
      return;
    }
    //creo un nuovo utente da inviare nel body
    const newUser = { nome, cognome, username, email, password };

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Errore durante la registrazione.");
      }

      setSuccess("Registrazione completata con successo! Effettua il login con Username e Password per accedere.");
      setTimeout(() => {
        handleClose();
      }, 4500);
    } catch (error) {
      console.log(error.message);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container fluid className=" p-0 m-0 ">
        <div className="d-flex justify-content-center align-items-center hero1">
          <div className="text-center text-white p-5">
            <h1 className="display-3 fw-bold ">Scopri la scena live di Bari.</h1>
            <h2 className="display-5 ">Tutti i concerti, in un solo posto!</h2>
            {!user && (
              <div className="p-5">
                <Button variant="light" className="rounded-3 fs-3 px-4 rounded-pill " onClick={handleShow}>
                  Registrati ora
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <img src="/src/assets/mascotteGifWhite.gif" alt="" style={{ width: 60 }} />
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success ? (
            <div className="d-flex flex-wrap align-items-center justify-content-center px-3 py-5">
              <img src={"/src/assets/success.gif"} alt="success animation" style={{ width: 250 }} />
              <p className="text-center fs-4 mt-5">{success}</p>
            </div>
          ) : (
            <Form onSubmit={handleSignUp}>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cognome">
                <Form.Label>Cognome</Form.Label>
                <Form.Control type="text" placeholder="Cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password </Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Inserisci password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="outline-secondary d-inline-block btn-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {showPassword ? "Nascondi password" : "Mostra password"}
                </span>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Chiudi
                </Button>
                <Button variant="dark" type="submit" disabled={loading}>
                  {loading ? "Registrazione..." : "Sign up"}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Hero;
