import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Componente creato per migliorare l'esperienza di navigazione tra pagine e far partire la visualizzazione sempre da inizio pagina.
//Sfrutto useEffect per eseguire un’azione (scrollare in alto) quando cambia il percorso della pagina (pathname).
//Utilizzato in App.jsx nel Router
const ScrollToTop = () => {
  // Con la destrutturazione dell’oggetto, estraggo direttamente la proprietà pathname senza dover salvare l’intero oggetto restituito da useLocation().
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" }); //behavior instant fa in modo che la pagina salti subito all’inizio, senza effetto di scorrimento.
  }, [pathname]); // ogni volta che cambia il percorso eseguo lo scrollTo.

  return null;
};

export default ScrollToTop;
