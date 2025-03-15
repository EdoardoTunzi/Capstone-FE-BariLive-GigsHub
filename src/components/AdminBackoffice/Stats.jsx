import { Accordion, Button } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { GiGuitar } from "react-icons/gi";

const Stats = ({ utenti, eventi, bands }) => {
  return (
    <div className="d-flex align-items-center justify-content-center border rounded-2 shadow-sm p-4">
      <div className="utenti text-center m-3">
        <FaUser size={30} />
        <p className="mb-0 mt-2">Utenti</p>
        <p className="fs-3 fw-bold mb-0">{utenti.length}</p>
      </div>
      <div className="eventi text-center m-3">
        <BsCalendarEvent size={30} />
        <p className="mb-0 mt-2">Eventi</p>
        <p className="fs-3 fw-bold mb-0">{eventi.length}</p>
      </div>
      <div className="band/artisti text-center m-3">
        <GiGuitar size={30} />
        <p className="mb-0 mt-2">Artisti</p>
        <p className="fs-3 fw-bold mb-0">{bands.length}</p>
      </div>
    </div>
  );
};

export default Stats;
