import { Card } from "react-bootstrap";

const BandCard = ({ band }) => {
  return (
    //fix classe eventCard , che eredita da css esterno
    <Card className="border-0 eventCard">
      <Card.Img variant="top" src={band.fotoBand} className="rounded-4" />
      <Card.Body className="rounded-bottom-4 shadow mt-2">
        <Card.Title className="text-uppercase fs-4">{band.nomeBand}</Card.Title>
        <div className="d-flex">
          <Card.Text className="text-capitalize">{band.genereMusicale}</Card.Text>
          <Card.Text className="text-capitalize ms-auto fs-2 fw-bold">{}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};
export default BandCard;
