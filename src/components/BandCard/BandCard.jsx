import { Card } from "react-bootstrap";
import "./BandCard.css";

const BandCard = ({ band }) => {
  return (
    <Card className="border-0 bandCard">
      <Card.Img variant="top" src={band.fotoBand} className=" rounded-0" />
      <Card.Body className="p-0 mt-2">
        <Card.Title className="text-uppercase m-0 fs-4">{band.nomeBand}</Card.Title>
        <Card.Text className="text-capitalize ">{band.genereMusicale}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default BandCard;
