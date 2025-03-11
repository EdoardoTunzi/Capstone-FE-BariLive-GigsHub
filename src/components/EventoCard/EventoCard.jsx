import { Button, Card, Modal } from "react-bootstrap";
import "./EventoCard.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const EventoCard = ({ evento }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);

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

  //IMPLEMENTA MODALE DETTAGLI EVENTO ! TANTO LO UTLIZZERAI ANCHE NELLA PAGINA EVENTI
  return (
    <>
      <Card className="border-0 eventCard" onClick={user ? handleShow : null} style={{ cursor: user ? "pointer" : "default" }}>
        <Card.Img variant="top" src={evento.locandina} className="rounded-0" />
        <Card.Body className="p-0 mt-2">
          <Card.Title className="text-uppercase fs-5 text-truncate">{evento.nome}</Card.Title>
          <div className="d-flex">
            <div>
              <Card.Text className="text-capitalize m-0 fw-bold">@ {evento.location}</Card.Text>
              <Card.Text className="text-capitalize">{evento.prezzoIngresso}</Card.Text>
            </div>

            <Card.Text className="text-capitalize ms-auto fs-4 fw-bold">{formatDate(evento.data)}</Card.Text>
          </div>
        </Card.Body>
      </Card>

      <Modal className="modal-bg" show={showModal} onHide={handleClose} centered>
        <Modal.Header className="text-white bg-black w-100 ">
          <Modal.Title>{evento.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 border-top  border-black border-3">
          <img src={evento.locandina} alt={evento.nome} className="img-fluid p-2 mb-3 rounded-5 border-black border-3" />
          <div className="border-top border-black border-3">
            <p className="mt-4">
              <strong>Location:</strong> {evento.location}
            </p>
          </div>
          <p className="text-capitalize">
            <strong>Data:</strong> {formatDate(evento.data)}
          </p>
          <p>
            <strong>Prezzo:</strong> {evento.prezzoIngresso}
          </p>
          <p>
            <strong>Band:</strong> {evento.band.nomeBand} (Genere: {evento.band.genereMusicale})
          </p>
          <p>
            <strong>Info: </strong>
            {evento.descrizione}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark">Link Evento</Button>
          <Button variant="outline-dark">Dice</Button>
          <Button variant="outline-dark" className="me-auto">
            TicketOne
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EventoCard;
