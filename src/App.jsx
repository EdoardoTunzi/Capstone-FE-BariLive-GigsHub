import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavBar from "./components/Header/MyNavBar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ArtistiPage from "./components/ArtistiPage/ArtistiPage";
import EventiPage from "./components/EventiPage/EventiPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import BackOffice from "./components/AdminBackoffice/Backoffice";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eventi" element={<EventiPage />} />
          <Route path="/artisti" element={<ArtistiPage />} />
          <Route path="/myhub" element={<ProfilePage />} />
          <Route path="/backoffice" element={<BackOffice />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
