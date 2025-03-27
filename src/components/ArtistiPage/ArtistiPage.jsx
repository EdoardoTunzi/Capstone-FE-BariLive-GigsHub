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

  const [currentPage, setCurrentPage] = useState(0); // Inizia da pagina 0
  const [totalPages, setTotalPages] = useState(1); // Numero totale di pagine
  const perPage = 12; // Eventi per pagina

  const getAllBands = async (page = 0) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/bands?page=${page}&size=${perPage}`);

      if (response.ok) {
        let bands = await response.json();
        setArtisti((prevBands) => [...prevBands, ...bands.content.filter((nuovaBand) => !prevBands.some((band) => band.id === nuovaBand.id))]);
        setTotalPages(bands.totalPages); // Aggiorna il numero totale di pagine
        setCurrentPage(bands.number);
      } else {
        throw new Error("Errore nel caricamento delle bands");
      }
    } catch (error) {
      console.error("Errore: " + error);
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
        setCurrentPage(0); // Resetta la paginazione
        setTotalPages(1);
      } else {
        throw new Error("Errore nel filtraggio degli artisti");
      }
    } catch (error) {
      console.error("Errore: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Reset per tornare alla lista completa
  const resetFiltri = () => {
    setFiltro("");
    setQuery("");
    setIsFiltered(false);
    setArtisti([]);
    getAllBands(0);
  };
  //gestione tasto mostra di più
  const handleShowMore = () => {
    if (currentPage + 1 < totalPages) {
      getAllBands(currentPage + 1);
    }
  };

  useEffect(() => {
    getAllBands(0);
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
          <>
            <Row className="gy-4 mt-3 border-top border-black border-4">
              {artisti.length > 0 ? (
                artisti.map((band) => (
                  <Col key={band.id} lg={3} md={4} sm={6}>
                    <BandCard band={band} />
                  </Col>
                ))
              ) : (
                <p className="mt-3 text-uppercase">Nessun evento trovato.</p>
              )}
            </Row>
            {/* Bottone "Mostra di più" */}
            {totalPages > 1 && currentPage + 1 < totalPages && !isFiltered && (
              <div className="d-flex justify-content-center my-5">
                <Button variant="link" className="text-black fs-5" onClick={handleShowMore} disabled={loading}>
                  {loading ? "Caricamento..." : "Mostra di più"}
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
export default ArtistiPage;
