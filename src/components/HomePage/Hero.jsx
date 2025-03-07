import { Button, Container } from "react-bootstrap";
import "./Hero.css";

const Hero = () => {
  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center hero1">
        <div className="text-center text-lg-start p-4 p-lg-0">
          <h1 className="display-3 fw-semi-bold ">
            <span className="fw-bold ">Scopri la scena live di Bari.</span> Tutti i concerti, in un solo posto!
          </h1>
          <div>
            <Button variant="dark" className="rounded-3 fs-4">
              Registrati ora
            </Button>
          </div>
        </div>

        <img
          className="border border-black border-1 rounded-4 shadow-xl d-none d-lg-block"
          src="/src/assets/hero.png"
          alt="live music black and white picture"
        />
      </div>
    </Container>
  );
};

export default Hero;
