import { useEffect, useState } from "react";
import BandCard from "../../BandCard/BandCard";
import { Button, Container } from "react-bootstrap";

const BandGrid = () => {
  const [bands, setBands] = useState([]);

  const fetchBands = async () => {
    try {
      let response = await fetch("http://localhost:8080/bands");
      if (response.ok) {
        let bands = await response.json();
        if (bands) {
          console.log(bands);
          setBands(bands.content);
        } else {
          console.log("Error: data not found");
        }
      } else {
        throw new Error("Error in fetching bands data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBands();
  }, []);

  return (
    <Container fluid className="p-5">
      <div className="d-flex align-items-start mb-4 border-bottom border-black border-5 pb-3">
        <h2 className="fs-1">Artisti del momento</h2>
        <Button variant="dark" href={"/artisti"} className="ms-auto fs-4 bg-black">
          Vedi tutti
        </Button>
      </div>

      <div className="scroll-container px-1 ">
        <div className="scroll-content d-flex gap-4 ">
          {bands.slice(0, 10).map((band) => (
            <BandCard key={band.id} band={band} />
          ))}
        </div>
      </div>
    </Container>
  );
};
export default BandGrid;
