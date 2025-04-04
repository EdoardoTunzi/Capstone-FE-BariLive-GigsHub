import { Button, Card, Modal } from "react-bootstrap";
import "./EventoCard.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RiMusicAiFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { ImLink } from "react-icons/im";

const EventoCard = ({ titolo, partecipazione, evento, handleReload }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [message, setMessage] = useState(""); // Per mostrare il messaggio di conferma o errore

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  //Formatta data da yyyy-mm-dd a DD-Mese
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let formattedDate = date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short"
    });
    return formattedDate.replace(/^\w/, (c) => c.toUpperCase());
  };
  //Formatta ora
  const formatTime = (time) => time.split(":").slice(0, 2).join(":");

  // Fetch per creare partecipazione
  const handlePartecipazione = async (eventoId, statoPartecipazione) => {
    try {
      const response = await fetch("http://localhost:8080/user/partecipazione", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          eventoId: eventoId,
          statoPartecipazione: statoPartecipazione
        })
      });

      const dataText = await response.text();

      if (response.ok) {
        //creo la partecipazione
        setMessage("Preferenza salvata e visibile nel tuo Hub");
      } else {
        if (dataText.includes("Hai già una partecipazione")) {
          //se la partecipazione è gia stata creata per questo evento
          //modifico lo stato della partecipazione esistente
          handleCambiaStato(eventoId, statoPartecipazione);
        } else {
          setMessage("Errore: " + dataText);
        }
      }
    } catch (error) {
      console.error("Errore nella creazione o modifica partecipazione. " + error);
      setMessage("Errore di rete, riprova più tardi");
    }
  };

  // Fetch per cambiare stato partecipazione
  const handleCambiaStato = async (eventoId, nuovoStato) => {
    try {
      const response = await fetch(`http://localhost:8080/user/partecipazione/${eventoId}?stato=${nuovoStato}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.text();
      if (response.ok) {
        setMessage(`Preferenza aggiornata in MyHub`);

        setTimeout(() => {
          handleReload();
        }, 1500);
      } else {
        setMessage(`Errore: ${data}`);
      }
    } catch (error) {
      console.error("Errore: ", error);
      setMessage("Errore di rete, riprova.");
    }
  };

  const handleDeletePartecipazione = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/partecipazione/${partecipazione.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage("Partecipazione eliminata con successo");

        setTimeout(() => {
          handleClose();
          handleReload();
        }, 1500);
      } else {
        const errorData = await response.text();
        setMessage(`Errore: ${errorData}`);
      }
    } catch (error) {
      console.error("Errore: ", error);
      setMessage("Errore di rete, riprova.");
    }
  };

  return (
    <>
      <Card className="border-0 eventCard mx-auto" onClick={user ? handleShow : null} style={{ cursor: user ? "pointer" : "default" }}>
        <div className="position-relative">
          <Card.Img variant="top" src={evento.locandina} className="rounded-0 " />
          <div className="position-absolute bottom-0 start-0 bg-black text-light fw-bold px-3 py-1 rounded-top text-capitalize">{formatDate(evento.data)}</div>
        </div>
        <Card.Body className="p-0 mt-2">
          <Card.Title className="text-uppercase fs-5 text-truncate mb-0">{evento.nome}</Card.Title>
          <Card.Text className="text-capitalize m-0 fw-bold">
            <RiMusicAiFill /> {evento.band.nomeBand}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Text className="text-capitalize m-0 fw-bold">
                <FaLocationDot /> {evento.location}
              </Card.Text>
              <Card.Text className="text-capitalize">{evento.prezzoIngresso}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal className="modal-bg" show={showModal} onHide={handleClose} centered>
        <Modal.Header className="text-white bg-black w-100 ">
          <Modal.Title>{evento.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 border-top  border-black border-3">
          <div className="text-center">
            <img src={evento.locandina} alt={evento.nome} className="img-fluid mb-4 rounded-5 border-black border-3" style={{ maxWidth: 360 }} />
          </div>
          <div className="border-top border-black border-3">
            <p className="mt-4 mb-1">
              <strong>Location:</strong> {evento.location}
            </p>
          </div>
          <p className="text-capitalize mb-1">
            <strong>Data:</strong> {formatDate(evento.data)} - {formatTime(evento.ora)}
          </p>
          <p className="mb-1">
            <strong>Prezzo:</strong> {evento.prezzoIngresso}
          </p>
          <p className="mb-1">
            <strong>Band:</strong> {evento.band.nomeBand} ({evento.band.genereMusicale})
          </p>
          <p className="mb-1">
            <strong>Info: </strong>
            {evento.descrizione}
          </p>
          {!titolo && (
            <div className="d-flex gap-3 align-items-center justify-content-center mt-4">
              {/* se non sono nella sezione my hub e non ho passato un titolo nelle props, i bottoni sono entrambi dark*/}
              <Button variant="dark" onClick={() => handlePartecipazione(evento.id, "PARTECIPERO")}>
                Parteciperò
              </Button>
              <Button variant="dark" onClick={() => handlePartecipazione(evento.id, "MI_INTERESSA")}>
                Mi Interessa
              </Button>
            </div>
          )}

          {titolo && titolo !== "Eventi a cui hai partecipato" && (
            <>
              <div className="d-flex gap-3 align-items-center justify-content-center mt-4">
                {/* in base al titolo che prendo da PartecipazioneGrid evidenzio o meno il tasto che mostra lo stato attuale della partecipazione */}
                <Button variant={titolo == "Eventi a cui parteciperai" ? "dark" : "secondary"} onClick={() => handlePartecipazione(evento.id, "PARTECIPERO")}>
                  Parteciperò
                </Button>
                <Button variant={titolo !== "Eventi a cui parteciperai" ? "dark" : "secondary"} onClick={() => handlePartecipazione(evento.id, "MI_INTERESSA")}>
                  Mi Interessa
                </Button>
                <Button variant="outline-danger" onClick={handleDeletePartecipazione}>
                  Elimina
                </Button>
              </div>
            </>
          )}
          {message && <p className="mt-2 text-center mb-0">{message}</p>}
        </Modal.Body>
        <Modal.Footer>
          {evento.urlEvento && (
            <Button variant="outline-dark px-2 py-1 me-auto" href={evento.urlEvento} target="_blank">
              <ImLink size={20} /> Sito evento
            </Button>
          )}

          {/* <Button variant="outline-dark py-0">
            <img src="/src/assets/dice.svg" alt="" style={{ width: 34 }} />
          </Button>
          <Button variant="outline-dark" className="me-auto pt-0 pb-1 ps-3">
            <img src="/src/assets/ticketone.svg" alt="" style={{ width: 75, height: 30 }} />
          </Button> */}
          <Button variant="dark" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EventoCard;
