import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from 'react-router-dom';

import Races from '../Races/Races';
import RaceDetails from '../Races/RaceDetails';

import Teams from '../Teams/Teams';
import TeamDetails from '../Teams/TeamDetails';

import Drivers from '../Drivers/Drivers';
import DriverDetails from '../Drivers/DriverDetails';

const SideBar = () => {
    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                Drivers
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to='/teams'
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                Teams
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to='/races'
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active'
                                        : ''
                                }
                            >
                                Races
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/' element={<Drivers />} />
                    <Route path='/:driverId' element={<DriverDetails />} />
                    <Route path='/teams' element={<Teams />} />
                    <Route
                        path='/teams/:constructorId'
                        element={<TeamDetails />}
                    />
                    <Route path='/races' element={<Races />} />
                    <Route path='/races/:round' element={<RaceDetails />} />
                </Routes>
            </Router>
        </>
    );
};

export default SideBar;
