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
        <div className='wrapper'>
            <Router>
                <div className='sidebar-wrapper'>
                    <div>
                        <img
                            className='logo'
                            src={require('../../assets/formula1-logo.png')}
                            style={{ width: '100%' }}
                            alt='logo'
                        />
                    </div>
                    <nav className='side-nav'>
                        <ul className='side-nav-items'>
                            <li className='side-nav-item'>
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

                            <li className='side-nav-item'>
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

                            <li className='side-nav-item'>
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
                </div>
                <div className='main-wrapper'>
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
                </div>
            </Router>
        </div>
    );
};

export default SideBar;
