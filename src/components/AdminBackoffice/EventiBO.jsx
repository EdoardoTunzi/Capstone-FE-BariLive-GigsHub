import { useState } from "react";
import { Accordion, Button, Form, Modal, Table, Toast } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
const EventiBO = ({ eventi, bands, getAllEventi }) => {
  const token = useSelector((state) => state.token);

  const [newEvent, setNewEvent] = useState(null);

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

  // Fetch per modifica evento
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

  //Fetch per creare nuovo evento
  const handleCreateNewEvent = async () => {
    //controllo che tutti i campi obbligatori siano presenti
    if (
      !newEvent.nome ||
      !newEvent.data ||
      !newEvent.ora ||
      !newEvent.location ||
      !newEvent.descrizione ||
      !newEvent.locandina ||
      !newEvent.prezzoIngresso ||
      !newEvent.bandId
    ) {
      setMessage("Compila tutti i campi obbligatori");
      return;
    }

    setMessage("");

    try {
      const response = await fetch(`http://localhost:8080/admin/evento`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newEvent)
      });

      const responseText = await response.text();

      if (response.ok) {
        setMessage(responseText || "Evento creato con successo");
        getAllEventi(); //faccio un refresh della lista eventi nel componente padre
        setTimeout(() => {
          setMessage("");
          setNewEvent(null);
        }, 20000);
      } else {
        throw new Error(responseText || "Errore sconosciuto");
      }
    } catch (error) {
      console.error("Errore nella creazione:", error);
      setMessage(`Errore nella creazione: ${error.message}`);
    }
  };

  // Funzione per eliminare un evento
  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      try {
        const response = await fetch(`http://localhost:8080/admin/evento/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseText = await response.text();

        if (response.ok) {
          setMessage(responseText || "Evento eliminato con successo");
          getAllEventi(); //faccio un refresh degli eventi nel componente padre
          setTimeout(() => {
            setMessage("");
          }, 20000);
        } else {
          throw new Error(responseText || "Errore sconosciuto");
        }
      } catch (error) {
        console.error("Errore nell'eliminazione:", error);
      }
    }
  };

  return (
    <>
      <Accordion flush>
        {/* Sezione Creazione Evento */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <BsCalendarEvent /> <p className="m-0 ms-2 fw-bold">Aggiungi Evento</p>
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nome Evento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome evento"
                  value={newEvent?.nome || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, nome: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  value={newEvent?.data || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, data: e.target.value })}
                  style={{ maxWidth: 130 }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ora</Form.Label>
                <Form.Control
                  type="time"
                  value={newEvent?.ora || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, ora: e.target.value })}
                  style={{ maxWidth: 130 }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome location"
                  value={newEvent?.location || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descrizione</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Inserisci descrizione(max 255 caratteri)"
                  value={newEvent?.descrizione || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, descrizione: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Locandina</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci url locandina"
                  value={newEvent?.locandina || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, locandina: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Prezzo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci prezzo, es. 12€ / Gratuito "
                  value={newEvent?.prezzoIngresso || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, prezzoIngresso: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Sito delle evento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci URL evento (opzionale)"
                  value={newEvent?.urlEvento || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, urlEvento: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Band</Form.Label>
                <Form.Select value={newEvent?.bandId || ""} onChange={(e) => setNewEvent({ ...newEvent, bandId: e.target.value })}>
                  <option value="">Seleziona una band...</option>
                  {bands.map((band) => (
                    <option key={band.id} value={band.id}>
                      (Id: {band.id}) {band.nomeBand}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
            <Button variant="dark" className="mt-3" onClick={handleCreateNewEvent}>
              Crea Nuovo Evento
            </Button>
          </Accordion.Body>
        </Accordion.Item>

        {/* Tabella con tutti gli eventi */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <LiaClipboardListSolid size={20} /> <p className="m-0 ms-1 fw-bold">Lista eventi</p>
          </Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Data</th>
                  <th>Ora</th>
                  <th>Location</th>
                  <th>Band - ID</th>
                  {/* <th>Descrizione</th> */}
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
                        {/* <td>{event.descrizione}</td> */}
                        <td>{event.locandina}</td>
                        <td>{event.prezzoIngresso}</td>
                        <td>{event.urlEvento}</td>
                        <td>
                          <Button className="" variant="warning" size="sm" onClick={() => handleEditClick(event)}>
                            <FaRegEdit />
                          </Button>{" "}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                            <RiDeleteBin6Line />
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
              <Form.Select
                value={editedEvent.band?.id || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, band: { ...editedEvent.band, id: e.target.value } })}
              >
                <option value="">Seleziona una band...</option>
                {bands.map((band) => (
                  <option key={band.id} value={band.id}>
                    (Id: {band.id}) {band.nomeBand}
                  </option>
                ))}
              </Form.Select>
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
export default EventiBO;
