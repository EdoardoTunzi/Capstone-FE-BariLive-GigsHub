import "./MyNavBar.css";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const MyNavBar = () => {
  return (
    <Navbar className="navbarCustom px-4 py-2" expand="md" bg="black" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src="/src/assets/logoBianco.png" alt="BariLive logo" style={{ width: 180 }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="me-0">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <Nav.Link className="text-white me-1" href="#mettilinkhome">
              HOME
            </Nav.Link>
            <Nav.Link className="text-white me-1" href="#mettilinkeventi">
              EVENTI
            </Nav.Link>
            <Nav.Link className="text-white me-1" href="#mettilinkartisti">
              ARTISTI
            </Nav.Link>
          </Nav>
          <Button className=" mt-4 mt-md-0 ms-auto border-2 rounded-0" variant="outline-light">
            LOGIN
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
