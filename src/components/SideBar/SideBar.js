import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Races from '../Races/Races';
import RaceDetails from '../RaceDetails/RaceDetails';
import Teams from '../Teams/Teams';
import Drivers from '../Drivers/Drivers';
import DriverDetails from '../Drivers/DriverDetails';

const SideBar = () => {
    return (
        <>
            <Router>
                <nav>
                    <ul>
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
                    <Route path='/driverDetails/:driverId' element={<DriverDetails />} />
                    <Route path='/teams' element={<Teams />} />
                    {/* <Route path="/teamsDetails/:constructorId" element={<TeamDetails />} /> */}
                    <Route path='/races' element={<Races />} />
                    <Route
                        path='/raceDetails/:round'
                        element={<RaceDetails />}
                    />
                </Routes>
            </Router>
        </>
    );
};

export default SideBar;
