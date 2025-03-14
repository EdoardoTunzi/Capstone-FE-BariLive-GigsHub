import { Accordion, Button } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { GiGuitar } from "react-icons/gi";

const Stats = ({ utenti, eventi, bands }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="utenti text-center m-2">
        <FaUser size={30} />
        <p className="mb-0">Utenti iscritti</p>
        <p className="fs-3 mb-0">{utenti.length}</p>
      </div>
      <div className="eventi text-center m-2">
        <BsCalendarEvent size={30} />
        <p className="mb-0">Eventi attivi</p>
        <p className="fs-3 mb-0">{eventi.length}</p>
      </div>
      <div className="band/artisti text-center m-2">
        <GiGuitar size={30} />
        <p className="mb-0">Band/Artisti</p>
        <p className="fs-3 mb-0">{bands.length}</p>
      </div>
    </div>
  );
};

export default Stats;
