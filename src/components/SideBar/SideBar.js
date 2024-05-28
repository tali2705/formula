import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Drivers from "../Drivers/Drivers";
//import DriversDetails from "./components/DriverDetails";
import Teams from "../Teams/Teams";
//import TeamsDetails from "./components/TeamDetails";
import Races from "../Races/Races";
//import RacesDetails from "./components/RaceDetails";


const SideBar = () => {
    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Drivers</Link></li>
                        <li><Link to="/teams">Teams</Link></li>
                        <li><Link to="/races">Races</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Drivers />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/races" element={<Races />} />
                </Routes>
            </Router>
        </>
    );
};

export default SideBar;