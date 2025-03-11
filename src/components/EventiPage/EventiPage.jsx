import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import EventoCard from "../EventoCard/EventoCard";
import "./EventiPage.css";
import { Calendar, Calendar2, CalendarDate, GeoAlt, MusicNote, Pin, PinMap, Type } from "react-bootstrap-icons";

const EventiPage = () => {
  const [eventi, setEventi] = useState([]);
  const [filtro, setFiltro] = useState(""); // Tipo di filtro selezionato
  const [query, setQuery] = useState(""); // Testo inserito dall'utente
  const [isFiltered, setIsFiltered] = useState(false); // Stato per sapere se è applicato un filtro

  // Fetch base per ottenere tutti gli eventi
  const getAllEventi = async () => {
    try {
      const response = await fetch("http://localhost:8080/eventi");

      if (response.ok) {
        let eventi = await response.json();
        setEventi(eventi.content);
      } else {
        throw new Error("Errore nel caricamento degli eventi");
      }
    } catch (error) {
      console.log("Errore: " + error);
    }
  };

  // Fetch con filtro
  const getEventiByFiltro = async () => {
    if (!query) return;

    let url = "";

    if (filtro === "band") {
      url = `http://localhost:8080/eventi/band?nomeBand=${query}`; // endpoint per band
    } else {
      url = `http://localhost:8080/eventi/${filtro}?${filtro}=${query}`; // endpoint per gli altri filtri
    }
    try {
      const response = await fetch(url);

      if (response.ok) {
        let eventiFiltrati = await response.json();
        setEventi(eventiFiltrati.content);
        setIsFiltered(true);
      } else {
        throw new Error("Errore nel filtrare gli eventi");
      }
    } catch (error) {
      console.log("Errore: " + error);
    }
  };

  // Reset per tornare alla lista completa
  const resetFiltri = () => {
    setFiltro("");
    setQuery("");
    setIsFiltered(false);
    getAllEventi();
  };

  useEffect(() => {
    getAllEventi();
  }, []);

  return (
    <Container className="mx-auto px-5 px-sm-0">
      <h1 className="mt-5">Eventi</h1>

      {/* Sezione Bottoni Filtri */}
      <div className="d-flex gap-2 mt-3 flex-wrap">
        <Button className="p-2 px-3" variant="dark" onClick={resetFiltri} disabled={!isFiltered}>
          Tutti
        </Button>
        <Button className="p-2 px-3" variant="dark" onClick={() => setFiltro("data")}>
          <CalendarDate /> Data
        </Button>
        <Button className="p-2 px-3" variant="dark" onClick={() => setFiltro("band")}>
          <MusicNote /> Artista
        </Button>
        <Button className="p-2 px-3" variant="dark" onClick={() => setFiltro("location")}>
          <GeoAlt /> Location
        </Button>
        <Button className="p-2 px-3" variant="dark" onClick={() => setFiltro("nome")}>
          <Type /> Nome
        </Button>
      </div>

      {/* Barra di ricerca visibile solo se è selezionato un filtro */}
      {filtro && (
        <Form
          className="mt-3 d-flex  mt-5 mb-5 searchbar-eventi"
          onSubmit={(e) => {
            e.preventDefault();
            getEventiByFiltro();
          }}
        >
          <Form.Control
            type={filtro === "data" ? "date" : "text"}
            placeholder={`Cerca per ${filtro}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" variant="dark" className="ms-2">
            Cerca
          </Button>
        </Form>
      )}

      {/* Lista Eventi */}
      <Row className="gy-4 mt-3 border-top border-black border-4">
        {eventi.length > 0 ? (
          eventi.map((evento) => (
            <Col key={evento.id} lg={2} md={3} sm={6}>
              <EventoCard evento={evento} />
            </Col>
          ))
        ) : (
          <p className="mt-3">Nessun evento trovato.</p>
        )}
      </Row>
    </Container>
  );
};

export default EventiPage;
