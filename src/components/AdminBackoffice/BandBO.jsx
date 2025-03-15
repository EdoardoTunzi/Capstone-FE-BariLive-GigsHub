import { useState } from "react";
import { Accordion, Button, Form, Modal, Table, Toast } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbMusicPlus } from "react-icons/tb";
import { useSelector } from "react-redux";

const BandBO = ({ bands, getAllBands }) => {
  const token = useSelector((state) => state.token);
  const [newBand, setNewBand] = useState(null);
  const [message, setMessage] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBand, setSelectedBand] = useState(null);
  const [editedBand, setEditedBand] = useState({});

  // Funzione per aprire il Modale di modifica
  const handleEditClick = (band) => {
    setSelectedBand(band);
    setEditedBand({ ...band }); // Clona i dati per modificarli
    setShowEditModal(true);
    setMessage("");
  };

  // Fetch per modifica band -- IMPLEMENTAAAAAAAAAAAAAAAAA
  const handleUpdateBandDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/band/${selectedBand.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editedBand)
      });

      const responseText = await response.text();
      if (response.ok) {
        setMessage(responseText || "Band modificata con successo");

        setTimeout(() => {
          getAllBands(); //faccio un refresh della lista eventi nel componente padre
          setShowEditModal(false);
        }, 2000);
      } else {
        throw new Error(responseText || "Errore sconosciuto");
      }
    } catch (error) {
      console.error("Errore nella modifica:", error);
      setMessage(`Errore nella modifica: ${error.message}`);
    }
  };

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
        setMessage(responseText || "Band creato con successo");
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

  //Fetch per eliminare band
  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa band?")) {
      try {
        const response = await fetch(`http://localhost:8080/admin/band/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseText = await response.text();

        if (response.ok) {
          setMessage(responseText || "Evento eliminato con successo");
          getAllBands(); //faccio un refresh degli eventi nel componente padre
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
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Azioni</th>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Bio</th>
                  <th>Genere</th>
                  <th>Foto</th>
                  <th>Sito web</th>
                  <th>Instagram</th>
                  <th>Facebook</th>
                  <th>Spotify</th>
                  <th>Soundcloud</th>
                  <th>Youtube</th>
                </tr>
              </thead>
              <tbody>
                {bands.length > 0 ? (
                  bands
                    .sort((a, b) => b.id - a.id)
                    .map((band) => (
                      <tr key={band.id}>
                        <td>
                          <Button className=" me-2" variant="warning" size="sm" onClick={() => handleEditClick(band)}>
                            <FaRegEdit />
                          </Button>
                          {"  "}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(band.id)}>
                            <RiDeleteBin6Line />
                          </Button>
                        </td>
                        <td>{band.id}</td>
                        <td>{band.nomeBand}</td>
                        <td>{band.bio}</td>
                        <td>{band.genereMusicale}</td>
                        <td>{band.fotoBand}</td>
                        <td>{band.sitoWeb}</td>
                        <td>{band.instagram}</td>
                        <td>{band.facebook}</td>
                        <td>{band.spotify}</td>
                        <td>{band.soundcloud}</td>
                        <td>{band.youtube}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4">Nessun bando trovato</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modale di modifica evento---------------------------- MODIFICA MODALE FORM--------------*/}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Band: ID {editedBand.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={editedBand.nomeBand || ""} onChange={(e) => setEditedBand({ ...editedBand, nomeBand: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genere</Form.Label>
              <Form.Control
                type="text"
                value={editedBand.genereMusicale || ""}
                onChange={(e) => setEditedBand({ ...editedBand, genereMusicale: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio (max 255)</Form.Label>
              <Form.Control as="textarea" value={editedBand.bio || ""} onChange={(e) => setEditedBand({ ...editedBand, bio: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Foto</Form.Label>
              <Form.Control type="text" value={editedBand.fotoBand || ""} onChange={(e) => setEditedBand({ ...editedBand, fotoBand: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sito ufficiale (opzionale)</Form.Label>
              <Form.Control type="text" value={editedBand.sitoWeb || ""} onChange={(e) => setEditedBand({ ...editedBand, sitoWeb: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Instagram (opzionale)</Form.Label>
              <Form.Control type="text" value={editedBand.instagram || ""} onChange={(e) => setEditedBand({ ...editedBand, instagram: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Facebook (opzionale)</Form.Label>
              <Form.Control type="text" value={editedBand.facebook || ""} onChange={(e) => setEditedBand({ ...editedBand, facebook: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Spotify (opzionale)</Form.Label>
              <Form.Control type="text" value={editedBand.spotify || ""} onChange={(e) => setEditedBand({ ...editedBand, spotify: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Soundcloud (opzionale)</Form.Label>
              <Form.Control type="text" value={editedBand.soundcloud || ""} onChange={(e) => setEditedBand({ ...editedBand, soundcloud: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Youtube(opzionale)</Form.Label>
              <Form.Control type="text" value={editedBand.youtube || ""} onChange={(e) => setEditedBand({ ...editedBand, youtube: e.target.value })} />
            </Form.Group>
          </Form>
          {message && <div className="mt-3 fs-5 fw-semi-bold text-center">{message} !</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Chiudi
          </Button>
          <Button variant="dark" onClick={handleUpdateBandDetails}>
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
export default BandBO;
