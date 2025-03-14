import { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbMusicPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

const BandBO = () => {
  const token = useSelector((state) => state.token);
  const [newBand, setNewBand] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <Accordion flush>
      {/* Sezione per aggiungere band */}
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <TbMusicPlus /> <p className="m-0 ms-1 fw-bold">Nuova band</p>
        </Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome Evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome evento"
                value={newBand?.nome || ""}
                onChange={(e) => setNewBand({ ...newBand, nome: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={newBand?.data || ""}
                onChange={(e) => setNewBand({ ...newBand, data: e.target.value })}
                style={{ maxWidth: 130 }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ora</Form.Label>
              <Form.Control
                type="time"
                value={newBand?.ora || ""}
                onChange={(e) => setNewBand({ ...newBand, ora: e.target.value })}
                style={{ maxWidth: 130 }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome location"
                value={newBand?.location || ""}
                onChange={(e) => setNewBand({ ...newBand, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Inserisci descrizione(max 255 caratteri)"
                value={newBand?.descrizione || ""}
                onChange={(e) => setNewBand({ ...newBand, descrizione: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Locandina</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci url locandina"
                value={newBand?.locandina || ""}
                onChange={(e) => setNewBand({ ...newBand, locandina: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci prezzo, es. 12€ / Gratuito "
                value={newBand?.prezzoIngresso || ""}
                onChange={(e) => setNewBand({ ...newBand, prezzoIngresso: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sito delle evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci URL evento (opzionale)"
                value={newBand?.urlEvento || ""}
                onChange={(e) => setNewBand({ ...newBand, urlEvento: e.target.value })}
              />
            </Form.Group>
          </Form>
          <Button variant="dark" className="mt-3">
            Aggiungi Nuova Band
          </Button>
        </Accordion.Body>
      </Accordion.Item>
      {/* Sezione Tabella con tutte le band */}
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <LiaClipboardListSolid size={20} /> <p className="m-0 ms-1 fw-bold">Lista band</p>
        </Accordion.Header>
        <Accordion.Body>
          <Button variant="success">Aggiungi Nuova Band</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default BandBO;
