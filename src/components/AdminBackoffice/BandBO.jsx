import { Accordion, Button } from "react-bootstrap";

const BandBO = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>🎸 Aggiungi Band</Accordion.Header>
        <Accordion.Body>
          <Button variant="success">Aggiungi Nuova Band</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default BandBO;
