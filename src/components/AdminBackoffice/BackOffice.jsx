import { Accordion, Button, Container, Nav, Tab } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { GiGuitar } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im";
import Stats from "./Stats";
import EventiBO from "./EventiBO";
import BandBO from "./BandBO";
import UtentiBO from "./UtentiBO";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const BackOffice = () => {
  const token = useSelector((state) => state.token);
  const [utenti, setUtenti] = useState([]);
  const [eventi, setEventi] = useState([]);
  const [bands, setBands] = useState([]);

  //fetch utenti
  const getAllUtenti = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/utenti", { headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) {
        const utenti = await response.json();
        setUtenti(utenti.content);
      }
    } catch (error) {
      console.error("Errore nel recupero utenti", error);
    }
  };
  //fetch eventi
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
  //fetch bands
  const getAllBands = async () => {
    try {
      const response = await fetch("http://localhost:8080/bands", { headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) {
        const bands = await response.json();
        setBands(bands.content);
      }
    } catch (error) {
      console.error("Errore nel recupero band", error);
    }
  };

  useEffect(() => {
    getAllUtenti();
    getAllEventi();
    getAllBands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container className="container-vh">
        <h1 className="border-bottom border-black border-4 mb-4 pb-3">Admin Backoffice</h1>
        <Tab.Container defaultActiveKey="stats">
          {/* Tab per navigare tra le sezioni */}
          <Nav variant="tabs">
            <Nav.Item className="border-black">
              <Nav.Link eventKey="stats" className="text-black ">
                <ImStatsDots /> Stats
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="eventi" className="text-black">
                <BsCalendarEvent /> Eventi
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="band" className="text-black">
                <GiGuitar /> Band
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="utenti" className="text-black">
                <FaUser /> Utenti
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="mt-3">
            {/* Sezione stats */}
            <Tab.Pane eventKey="stats">
              <h4>Statistiche</h4>
              <Stats utenti={utenti} eventi={eventi} bands={bands} />
            </Tab.Pane>
            {/* SEZIONE EVENTI */}
            <Tab.Pane eventKey="eventi">
              <h4>Gestione Eventi</h4>
              <EventiBO eventi={eventi} bands={bands} getAllEventi={getAllEventi} />
            </Tab.Pane>

            {/* SEZIONE BAND */}
            <Tab.Pane eventKey="band">
              <h4>Gestione Band</h4>
              <BandBO bands={bands} refreshBands={getAllBands} />
            </Tab.Pane>

            {/* SEZIONE UTENTI */}
            <Tab.Pane eventKey="utenti">
              <h4>Gestione Utenti</h4>
              <UtentiBO utenti={utenti} refreshUtenti={getAllUtenti} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </>
  );
};

export default BackOffice;
