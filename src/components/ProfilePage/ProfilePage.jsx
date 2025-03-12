import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import PartecipazioniGrid from "./PartecipazioniGrid";
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { logout } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [partecipero, setPartecipero] = useState([]);
  const [miInteressa, setMiInteressa] = useState([]);
  const [partecipato, setPartecipato] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Container>
        {/* Sezione info account */}
        <div className="profile-info my-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {/* Sezione Avatar + Info */}
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle border border-black overflow-hidden d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: 150, height: 150 }}
              >
                <img className="w-100 h-100 object-fit-cover" src={user.avatar} alt="avatar utente" />
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

            {/* Sezione Pulsanti */}
            <div className="d-flex flex-column align-items-end">
              <Button variant="dark" className="mb-2" onClick={handleLogout}>
                Log out
              </Button>
              <Button variant="link" className="text-black p-0">
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
    </>
  );
};

export default ProfilePage;
