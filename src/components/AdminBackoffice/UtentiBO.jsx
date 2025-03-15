import { useState } from "react";
import { Accordion, Button, Table, Toast } from "react-bootstrap";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const UtentiBO = ({ utenti, getAllUtenti }) => {
  const token = useSelector((state) => state.token);
  const [message, setMessage] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo utente?")) {
      try {
        const response = await fetch(`http://localhost:8080/admin/utente/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseText = await response.text();

        if (response.ok) {
          setMessage(responseText || "Utente eliminato con successo");
          getAllUtenti(); //faccio un refresh degli eventi nel componente padre
          setTimeout(() => {
            setMessage("");
          }, 20000);
        } else {
          throw new Error(responseText || "Errore sconosciuto");
        }
      } catch (error) {
        console.error("Errore nell'eliminazione:", error);
      }
    }
  };

  return (
    <>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="border-bottom">
            <LiaClipboardListSolid size={20} /> <p className="m-0 ms-1 fw-bold">Lista utenti</p>
          </Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Azione</th>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Cognome</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Ruolo</th>
                </tr>
              </thead>
              <tbody>
                {utenti.length > 0 ? (
                  utenti
                    .sort((a, b) => b.id - a.id)
                    .map((utente) => (
                      <tr key={utente.id}>
                        <td className="text-center">
                          <Button variant="danger" size="sm" onClick={() => handleDelete(utente.id)}>
                            <RiDeleteBin6Line />
                          </Button>
                        </td>
                        <td>{utente.id}</td>
                        <td>{utente.nome}</td>
                        <td>{utente.cognome}</td>
                        <td>{utente.username}</td>
                        <td>{utente.email}</td>
                        <td>{utente.ruolo}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4">Nessun utente trovato</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Toast
        show={!!message}
        onClose={() => setMessage("")}
        delay={20000}
        autohide
        bg={message.includes("Errore") ? "danger" : "light"}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">{message.includes("Errore") ? "Errore" : "Notifica:"}</strong>
        </Toast.Header>
        <Toast.Body className={message.includes("Errore") ? "text-white" : ""}>{message}</Toast.Body>
      </Toast>
    </>
  );
};
export default UtentiBO;
