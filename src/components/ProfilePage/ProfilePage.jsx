import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import PartecipazioniGrid from "./PartecipazioniGrid";
import { MdEdit, MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { logout } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  /* fetch eventi da partecipazioni */
  const [partecipero, setPartecipero] = useState([]);
  const [miInteressa, setMiInteressa] = useState([]);
  const [partecipato, setPartecipato] = useState([]);
  const [loading, setLoading] = useState(true);

  /* modale password change */
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleClosePassword = () => setShowPasswordModal(false);
  const handleShowPassword = () => setShowPasswordModal(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* FetchPartecipazioni */
  const fetchPartecipazioni = async (stato, setState) => {
    try {
      const response = await fetch(`http://localhost:8080/user/partecipazioni?stato=${stato}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        //qui estraggo solo gli eventi dall'array delle partecipazioni
        const eventiEstratti = data.content.map((partecipazione) => partecipazione.evento);
        console.log(eventiEstratti);

        setState(eventiEstratti);
      } else {
        throw new Error("Errore nel caricamento degli eventi dalle partecipazioni");
      }
    } catch (error) {
      console.log("Errore: ", error);
    }
  };

  /* Gestisce il logout */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  /* Gestisce la modifica password */
  const handlePasswordChange = async () => {
    //setto su null error e success, per evitare messaggi vecchi
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8080/user/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Se usi JWT
        },
        body: JSON.stringify({
          oldPassword,
          newPassword
        })
      });
      const textData = await response.text();

      if (!response.ok) {
        throw new Error(textData || "Errore nel cambio password");
      }

      //scegli se lanciare anceh un toast success a fondo pagina
      setSuccess(textData);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.log("Errore: ", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchPartecipazioni("PARTECIPERO", setPartecipero),
      fetchPartecipazioni("MI_INTERESSA", setMiInteressa),
      fetchPartecipazioni("PARTECIPATO", setPartecipato)
    ]).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="container-vh">
        {/* Sezione info account */}
        <div className="profile-info my-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {/* Sezione Avatar + Info */}
            <div className="d-flex align-items-center ">
              <div className="position-relative">
                <div
                  className="rounded-circle border border-black overflow-hidden d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: 150, height: 150 }}
                >
                  <img className="w-100 h-100 object-fit-cover" src={user.avatar} alt="avatar utente" />
                  <div className="editAvatar position-absolute bottom-0 end-0  bg-white rounded-circle shadow-sm text-black border border-black">
                    <MdEdit size={20} />
                  </div>
                </div>
              </div>

              <div className="ms-4">
                <p className="fs-1 fw-bold m-0">
                  {user.nome} {user.cognome}
                </p>
                <p className="fs-5 m-0 d-flex align-items-center">
                  <IoPersonSharp /> {user.username}
                </p>
                <p className="fs-5 m-0 d-flex align-items-center">
                  <MdEmail /> {user.email}
                </p>
              </div>
            </div>

            {/* Sezione Pulsanti azioni profilo, sulla destra*/}
            <div className="d-flex flex-column align-items-end">
              <Button variant="dark" className="mb-2" onClick={handleLogout}>
                Log out
              </Button>
              <Button variant="link" className="text-black p-0" onClick={handleShowPassword}>
                Cambia Password
              </Button>
              <Button variant="link" className="text-black p-0">
                Modifica i tuoi dettagli
              </Button>
              <Button variant="link" className="text-danger p-0">
                Cancella account
              </Button>
            </div>
          </div>
        </div>

        {/* Sezione Partecipazioni Grids */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <PartecipazioniGrid titolo="Eventi a cui parteciperai" eventi={partecipero} />
            <PartecipazioniGrid titolo="Eventi che ti interessano" eventi={miInteressa} />
            <PartecipazioniGrid titolo="Eventi a cui hai partecipato" eventi={partecipato} />
          </>
        )}
      </Container>

      {/* MODALI */}

      {/* modale cambio password */}
      <Modal show={showPasswordModal} onHide={handleClosePassword}>
        <Modal.Header closeButton>
          <Modal.Title>Cambia Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Password attuale</Form.Label>
              <Form.Control
                className="shadow-black bs-dark-border-subtle"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nuova password</Form.Label>
              <Form.Control
                className="shadow-black bs-dark-border-subtle"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
              />
            </Form.Group>
          </Form>
          <Button variant="dark" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePassword}>
            Close
          </Button>
          <Button variant="dark" onClick={handlePasswordChange}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale cambio avatar */}
    </>
  );
};

export default ProfilePage;
