import { useEffect, useState } from "react";
import BandCard from "../../BandCard/BandCard";
import { Button, Container } from "react-bootstrap";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import { Link } from "react-router-dom";

const BandGrid = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBands = async () => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:8080/bands");
      if (response.ok) {
        let bands = await response.json();
        if (bands) {
          setBands(bands.content);
        } else {
          console.log("Error: data not found");
        }
      } else {
        throw new Error("Error in fetching bands data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Quando il fetch è terminato, nasconde lo spinner
    }
  };

  useEffect(() => {
    fetchBands();
  }, []);

  return (
    <Container className="p-0 ">
      <div className="d-flex align-items-start mb-4 border-bottom border-black border-5 pb-3">
        <h2 className="fs-2">Artisti del momento</h2>
        <Button variant="dark" as={Link} to={"/artisti"} className="ms-auto fs-5 bg-black">
          Vedi tutti
        </Button>
      </div>

      <div className="scroll-container">
        <div className="scroll-content d-flex gap-4 ">
          {loading ? <LoadingSpinner /> : bands && bands.slice(0, 10).map((band) => <BandCard key={band.id} band={band} />)}
        </div>
      </div>
    </Container>
  );
};
export default BandGrid;
