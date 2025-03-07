import { Container, Nav, Navbar } from "react-bootstrap";

const MyNavBar = () => {
  return (
    <Navbar bg="black" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Eventi</Nav.Link>
          <Nav.Link href="#pricing">Artisti</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
