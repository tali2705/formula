import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Drivers from "./components/Drivers";
import DriversDetails from "./components/DriverDetails";
import Teams from "./components/Teams";
import TeamsDetails from "./components/TeamDetails";
import Races from "./components/Races";
import RacesDetails from "./components/RaceDetails";


const SideBar = () => {

    return (
        <div>
            <Router>
                <nav>
                    <Link to="/">Drivers</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Drivers />} />
                    <Route path="/DriverDetails/:id" element={<DriverDetails />} />
                </Routes>
            </Router>
            <Router>
                <nav>
                    <Link to="/">Teams</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Teams />} />
                    <Route path="/TeamDetails/:id" element={<TeamDetails />} />
                </Routes>
            </Router>
            <Router>
                <nav>
                    <Link to="/">Races</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Races />} />
                    <Route path="/RaceDetails/:id" element={<RaceDetails />} />
                </Routes>
            </Router>
        </div>
    );
};

export default SideBar;