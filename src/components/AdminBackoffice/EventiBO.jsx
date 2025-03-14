import { useState } from "react";
import { Accordion, Button, Form, Modal, Table } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { useSelector } from "react-redux";
const EventiBO = ({ eventi, getAllEventi }) => {
  const token = useSelector((state) => state.token);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});
  const [message, setMessage] = useState("");

  // Funzione per aprire il Modale di modifica
  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditedEvent({ ...event }); // Clona i dati per modificarli
    setShowEditModal(true);
    setMessage("");
  };

  // Funzione per salvare le modifiche all'evento con PUT
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/evento/${selectedEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          nome: editedEvent.nome,
          data: editedEvent.data,
          ora: editedEvent.ora,
          location: editedEvent.location,
          descrizione: editedEvent.descrizione,
          prezzoIngresso: editedEvent.prezzoIngresso,
          urlEvento: editedEvent.urlEvento,
          locandina: editedEvent.locandina,
          bandId: editedEvent.band.id // Invio solo l'id della band
        })
      });

      if (response.ok) {
        setMessage("Evento modificato con successo");

        setTimeout(() => {
          getAllEventi(); //faccio un refresh della lista eventi nel componente padre
          setShowEditModal(false);
        }, 2000);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Errore sconosciuto");
      }
    } catch (error) {
      console.error("Errore nella modifica:", error);
      setMessage(`Errore nella modifica: ${error.message}`);
    }
  };

  // Funzione per eliminare un evento
  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      try {
        await fetch(`URL_DELETE_EVENT/${id}`, { method: "DELETE" });
        getAllEventi(); //faccio un refresh degli eventi nel componente padre
      } catch (error) {
        console.error("Errore nell'eliminazione:", error);
      }
    }
  };

  return (
    <>
      <Accordion>
        {/* Sezione Creazione Evento */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <BsCalendarEvent /> Aggiungi Evento
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nome Evento</Form.Label>
                <Form.Control type="text" placeholder="Inserisci nome evento" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Data</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Button variant="success" className="mt-3">
                Crea Nuovo Evento
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* Tabella con tutti gli eventi */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>📋 Lista Eventi</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Data</th>
                  <th>Ora</th>
                  <th>Location</th>
                  <th>Band/Artista</th>
                  <th>Descrizione</th>
                  <th>Locandina</th>
                  <th>Prezzo</th>
                  <th>Url</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {eventi.length > 0 ? (
                  eventi
                    .sort((a, b) => b.id - a.id)
                    .map((event) => (
                      <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.nome}</td>
                        <td>{event.data}</td>
                        <td>{event.ora}</td>
                        <td>{event.location}</td>
                        <td>
                          {event.band.nomeBand} - {event.band.id}
                        </td>
                        <td>{event.descrizione}</td>
                        <td>{event.locandina}</td>
                        <td>{event.prezzoIngresso}</td>
                        <td>{event.urlEvento}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEditClick(event)}>
                            ✏ Modifica
                          </Button>{" "}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                            ❌ Elimina
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4">Nessun evento trovato</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modale di modifica evento */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Evento ID: {editedEvent.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome Evento</Form.Label>
              <Form.Control type="text" value={editedEvent.nome || ""} onChange={(e) => setEditedEvent({ ...editedEvent, nome: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" value={editedEvent.data || ""} onChange={(e) => setEditedEvent({ ...editedEvent, data: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ora</Form.Label>
              <Form.Control type="text" value={editedEvent.ora || ""} onChange={(e) => setEditedEvent({ ...editedEvent, ora: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Luogo</Form.Label>
              <Form.Control type="text" value={editedEvent.location || ""} onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Band</Form.Label>
              <Form.Control
                type="text"
                value={editedEvent.band?.id || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, band: { ...editedEvent.band, id: e.target.value } })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrizione (max 255)</Form.Label>
              <Form.Control
                as="textarea"
                value={editedEvent.descrizione || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, descrizione: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prezzo Ingresso</Form.Label>
              <Form.Control
                type="text"
                value={editedEvent.prezzoIngresso || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, prezzoIngresso: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Url evento(opzionale)</Form.Label>
              <Form.Control type="text" value={editedEvent.urlEvento || ""} onChange={(e) => setEditedEvent({ ...editedEvent, urlEvento: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Locandina</Form.Label>
              <Form.Control type="text" value={editedEvent.locandina || ""} onChange={(e) => setEditedEvent({ ...editedEvent, locandina: e.target.value })} />
            </Form.Group>
          </Form>
          {message && <div className="mt-3 fs-5 fw-semi-bold text-center">{message} !</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EventiBO;
