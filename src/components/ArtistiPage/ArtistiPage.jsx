import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import BandCard from "../BandCard/BandCard";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { Type } from "react-bootstrap-icons";
import { RiMusicAiFill } from "react-icons/ri";

const ArtistiPage = () => {
  const [artisti, setArtisti] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtro, setFiltro] = useState(""); // Tipo di filtro selezionato
  const [query, setQuery] = useState(""); // Testo inserito dall'utente
  const [isFiltered, setIsFiltered] = useState(false);

  const getAllBands = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/bands");

      if (response.ok) {
        let bands = await response.json();
        setArtisti(bands.content);
      } else {
        throw new Error("Errore nel caricamento delle bands");
      }
    } catch (error) {
      console.log("Errore: " + error);
    } finally {
      setLoading(false); // Quando il fetch è terminato, nasconde lo spinner
    }
  };
  //fetch con filtro
  const getArtistiByFiltro = async () => {
    if (!query) return;

    let url = `http://localhost:8080/bands/${filtro}?${filtro}=${query}`;
    setLoading(true);

    try {
      const response = await fetch(url);

      if (response.ok) {
        let artistiFiltrati = await response.json();
        setArtisti(artistiFiltrati);
        setIsFiltered(true);
      } else {
        throw new Error("Errore nel filtraggio degli artisti");
      }
    } catch (error) {
      console.log("Errore: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Reset per tornare alla lista completa
  const resetFiltri = () => {
    setFiltro("");
    setQuery("");
    setIsFiltered(false);
    getAllBands();
  };

  useEffect(() => {
    getAllBands();
  }, []);

  return (
    <div className="mb-5">
      <Container className="mx-auto px-5 px-sm-0 container-vh">
        <h1 className="mt-5">Artisti</h1>

        {/* Sezione Bottoni Filtri */}
        <div className="d-flex gap-2 mt-3 flex-wrap">
          <Button className="p-2 px-3" variant="dark" onClick={resetFiltri} disabled={!isFiltered}>
            Tutti
          </Button>
          <Button className="p-2 px-3" variant="dark" onClick={() => setFiltro("nome")}>
            <Type /> Nome
          </Button>
          <Button className="p-2 px-3" variant="dark" onClick={() => setFiltro("genere")}>
            <RiMusicAiFill /> Genere
          </Button>
        </div>

        {/* Barra di ricerca visibile solo se è selezionato un filtro */}
        {filtro && (
          <Form
            className="mt-3 d-flex  mt-5 mb-5 searchbar-eventi"
            onSubmit={(e) => {
              e.preventDefault();
              getArtistiByFiltro();
            }}
          >
            <Form.Control type="text" placeholder={`Cerca per ${filtro}`} value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button type="submit" variant="dark" className="ms-2">
              Cerca
            </Button>
          </Form>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Row className="gy-4 mt-3 border-top border-black border-4">
            {artisti.length > 0 ? (
              artisti.map((band) => (
                <Col key={band.id} lg={3} md={3} sm={6}>
                  <BandCard band={band} />
                </Col>
              ))
            ) : (
              <p className="mt-3 text-uppercase">Nessun evento trovato.</p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};
export default ArtistiPage;
