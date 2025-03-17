import { Button, Card, Modal } from "react-bootstrap";
import "./BandCard.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Facebook, Instagram, Spotify, Youtube } from "react-bootstrap-icons";
import { PiSoundcloudLogoFill } from "react-icons/pi";

const BandCard = ({ band }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card className="border-0 bandCard" onClick={user ? handleShow : null} style={{ cursor: user ? "pointer" : "default" }}>
        <Card.Img variant="top" src={band.fotoBand} className=" rounded-0" />
        <Card.Body className="p-0 mt-2">
          <Card.Title className="text-uppercase m-0 fs-5">{band.nomeBand}</Card.Title>
          <Card.Text className="text-capitalize ">{band.genereMusicale}</Card.Text>
        </Card.Body>
      </Card>

      <Modal className="modal-bg" show={showModal} onHide={handleClose} centered>
        <Modal.Header className="text-white bg-black w-100 ">
          <Modal.Title>{band.nomeBand}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 border-top  border-black border-3">
          <div className="text-center">
            <img src={band.fotoBand} alt={band.nome} className="img-fluid p-2 mb-3 rounded-5 border-black border-3" style={{ maxWidth: 360 }} />
          </div>

          <div className="border-top border-black border-3">
            <p className="mt-4 text-uppercase">
              <strong className="text-capitalize">Genere:</strong> {band.genereMusicale}
            </p>
          </div>
          <p>
            <strong>Bio:</strong> {band.bio}
          </p>
          <a href={band.sitoWeb} target="_blank">
            Sito ufficiale
          </a>
          <div className="d-flex fs-2 gap-4 justify-content-center">
            <a className="text-black" href={band.instagram} target="_blank">
              <Instagram />
            </a>
            <a className="text-black" href={band.facebook} target="_blank">
              <Facebook />
            </a>
            <a className="text-black" href={band.spotify} target="_blank">
              <Spotify />
            </a>
            <a className="text-black" href={band.soundcloud} target="_blank">
              <PiSoundcloudLogoFill />
            </a>
            <a className="text-black" href={band.youtube} target="_blank">
              <Youtube />
            </a>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="dark" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default BandCard;
