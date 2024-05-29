<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Races from '../Races/Races';
import RaceDetails from '../RaceDetails/RaceDetails';
import Teams from '../Teams/Teams';
import Drivers from '../Drivers/Drivers';
=======
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Races from "../Races/Races";
import RaceDetails from "../RaceDetails/RaceDetails";
import Teams from '../Teams/Teams';
import Drivers from '../Drivers/Drivers';


>>>>>>> e4a96582bbfd44a1794b1f3f1a8f541f68ee6d93

const SideBar = () => {
    return (
        <>
            <Router>
                <nav>
                    <ul>
<<<<<<< HEAD
                        <li>
                            <Link to='/drivers'>Drivers</Link>
                        </li>
                        <li>
                            <Link to='/teams'>Teams</Link>
                        </li>
                        <li>
                            <Link to='/races'>Races</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/drivers' element={<Drivers />} />
                    <Route path='/drivers' element={<Drivers />} />
                    <Route path='/teams' element={<Teams />} />
                    {/* <Route path="/teams" element={<Teams />} /> */}
                    <Route path='/races' element={<Races />} />
                    <Route
                        path='/raceDetails/:round'
                        element={<RaceDetails />}
                    />
=======
                        <li><Link to="/drivers">Drivers</Link></li>
                        <li><Link to="/teams">Teams</Link></li>
                        <li><Link to="/races">Races</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/drivers" element={<Drivers />} />
                    {/* <Route path="/drivers" element={<Drivers />} /> */}
                    <Route path="/teams" element={<Teams />} />
                    {/* <Route path="/teams" element={<Teams />} /> */}
                    <Route path="/races" element={<Races />} />
                    <Route path="/raceDetails/:round" element={<RaceDetails />} />
>>>>>>> e4a96582bbfd44a1794b1f3f1a8f541f68ee6d93
                </Routes>
            </Router>
        </>
    );
};

export default SideBar;
