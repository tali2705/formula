import React from 'react';
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

import { INavLinkItem } from '../Interfaces/GlobalInterface';

const SideBar: React.FC = () => {
    const navLinks: INavLinkItem[] = [
        { label: 'Drivers', to: '/' },
        { label: 'Teams', to: '/teams' },
        { label: 'Races', to: '/races' },
    ];

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
                            {navLinks.map((item) => (
                                <li className='side-nav-item' key={item.label}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive, isPending }) =>
                                            isPending
                                                ? 'pending'
                                                : isActive
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
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
