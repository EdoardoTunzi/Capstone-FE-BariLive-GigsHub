import "./MyNavBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";

const MyNavBar = () => {
  return (
    <Navbar bg="black" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src="/src/assets/logoWhite.png" alt="BariLive logo" style={{ width: 180 }} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">HOME</Nav.Link>
          <Nav.Link href="#features">EVENTI</Nav.Link>
          <Nav.Link href="#pricing">ARTISTI</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
