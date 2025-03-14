import { useState } from "react";
import { Accordion, Button, Form, Toast } from "react-bootstrap";
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbMusicPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

const BandBO = ({ bands, getAllBands }) => {
  const token = useSelector((state) => state.token);
  const [newBand, setNewBand] = useState(null);
  const [message, setMessage] = useState("");

  //Fetch per creare nuova band
  const handleCreateNewBand = async () => {
    if (!newBand.nomeBand || !newBand.bio || !newBand.genereMusicale || !newBand.fotoBand) {
      setMessage("Compila tutti i campi obbligatori");
      return;
    }

    setMessage("");

    try {
      const response = await fetch(`http://localhost:8080/admin/band`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newBand)
      });
      const responseText = await response.text();

      if (response.ok) {
        setMessage(responseText || "Evento creato con successo");
        getAllBands(); //faccio un refresh della lista band nel componente padre
        setTimeout(() => {
          setMessage("");
          setNewBand(null);
        }, 20000);
      } else {
        throw new Error(responseText || "Errore sconosciuto");
      }
    } catch (error) {
      console.error("Errore nella creazione:", error);
      setMessage(`Errore nella creazione: ${error.message}`);
    }
  };

  return (
    <>
      <Accordion flush>
        {/* Sezione per aggiungere band */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <TbMusicPlus /> <p className="m-0 ms-1 fw-bold">Nuova band</p>
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nome Band / Artista</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome"
                  value={newBand?.nomeBand || ""}
                  onChange={(e) => setNewBand({ ...newBand, nomeBand: e.target.value })}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Inserisci biografia"
                  value={newBand?.bio || ""}
                  onChange={(e) => setNewBand({ ...newBand, bio: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Genere</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci genere musicale"
                  value={newBand?.genereMusicale || ""}
                  onChange={(e) => setNewBand({ ...newBand, genereMusicale: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Foto Band</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci url foto"
                  value={newBand?.fotoBand || ""}
                  onChange={(e) => setNewBand({ ...newBand, fotoBand: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Sito web</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci sito web (opzionale)"
                  value={newBand?.sitoWeb || ""}
                  onChange={(e) => setNewBand({ ...newBand, sitoWeb: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci URL instagram (opzionale)"
                  value={newBand?.instagram || ""}
                  onChange={(e) => setNewBand({ ...newBand, instagram: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Facebook </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci URL facebook (opzionale)"
                  value={newBand?.facebook || ""}
                  onChange={(e) => setNewBand({ ...newBand, facebook: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Spotify</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci URL spotify (opzionale)"
                  value={newBand?.spotify || ""}
                  onChange={(e) => setNewBand({ ...newBand, spotify: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Soundcloud</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci URL soundcloud (opzionale)"
                  value={newBand?.soundcloud || ""}
                  onChange={(e) => setNewBand({ ...newBand, soundcloud: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Youtube</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci URL youtube (opzionale)"
                  value={newBand?.youtube || ""}
                  onChange={(e) => setNewBand({ ...newBand, youtube: e.target.value })}
                />
              </Form.Group>
            </Form>
            <Button variant="dark" className="mt-3" onClick={handleCreateNewBand}>
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

      {/* Toast per notifiche */}
      <Toast
        show={!!message}
        onClose={() => setMessage("")}
        delay={20000}
        autohide
        bg={message.includes("Errore") ? "danger" : "light"}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">{message.includes("Errore") ? "Errore" : "Notifica:"}</strong>
        </Toast.Header>
        <Toast.Body className={message.includes("Errore") ? "text-white" : ""}>{message}</Toast.Body>
      </Toast>
    </>
  );
};
export default BandBO;
