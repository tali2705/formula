import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/styles.scss";
import Footer from "./components/Footer/Footer";
import Drivers from "./components/Drivers/Drivers";
import DriverDetails from "./components/Drivers/DriverDetails";
import Teams from "./components/Teams/Teams";
import TeamDetails from "./components/Teams/TeamDetails";
import Races from "./components/Races/Races";
import RaceDetails from "./components/Races/RaceDetails";
import Home from "./components/HomePage/Home";

function App() {
  return (
    <>
      <div className="wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/drivers/:driverId" element={<DriverDetails />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:constructorId" element={<TeamDetails />} />
            <Route path="/races" element={<Races />} />
            <Route path="/races/:round" element={<RaceDetails />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
