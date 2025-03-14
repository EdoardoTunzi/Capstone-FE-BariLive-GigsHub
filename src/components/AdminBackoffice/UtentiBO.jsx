import { Accordion, Button } from "react-bootstrap";

const UtentiBO = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>🛑 Blocca Utente</Accordion.Header>
        <Accordion.Body>
          <Button variant="danger">Blocca Utente</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default UtentiBO;
