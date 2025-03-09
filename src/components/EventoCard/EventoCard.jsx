import { Card } from "react-bootstrap";
import "./EventoCard.css";

const EventoCard = ({ evento }) => {
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
    <Card className="border-0 eventCard">
      <Card.Img variant="top" src={evento.locandina} className="rounded-4" />
      <Card.Body className="rounded-bottom-4 shadow mt-2">
        <Card.Title className="text-uppercase fs-4">{evento.nome}</Card.Title>
        <div className="d-flex">
          <div>
            <Card.Text className="text-capitalize m-0 fw-bold">{evento.location}</Card.Text>
            <Card.Text className="text-capitalize">{evento.prezzoIngresso}</Card.Text>
          </div>

          <Card.Text className="text-capitalize ms-auto fs-2 fw-bold">{formatDate(evento.data)}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};
export default EventoCard;
