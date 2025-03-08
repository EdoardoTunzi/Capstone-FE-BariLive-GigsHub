import { Card } from "react-bootstrap";

const EventoCard = ({ evento }) => {
  return (
    <Card className="border border-black rounded-4">
      <Card.Img variant="top" src={evento.locandina} className="rounded-top-4 shadow-sm" />
      <Card.Body className="">
        <Card.Title className="text-uppercase fs-4">{evento.nome}</Card.Title>
        <Card.Text>
          - {evento.data} Ore: {evento.ora}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default EventoCard;
