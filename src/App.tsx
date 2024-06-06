import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/styles.scss';

import Footer from './components/Footer/Footer';
import Drivers from './components/Drivers/Drivers';
import DriverDetails from './components/Drivers/DriverDetails';
import Teams from './components/Teams/Teams';
import TeamDetails from './components/Teams/TeamDetails';
import Races from './components/Races/Races';
import RaceDetails from './components/Races/RaceDetails';
import HomePage from './components/HomePage/HomePage';

import ScrollToTop from './components/utils/ScrollToTop';

function App(): JSX.Element {
    return (
        <div className='wrapper'>
            <Router>
                <ScrollToTop>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/drivers' element={<Drivers />} />
                        <Route
                            path='/drivers/:driverId'
                            element={<DriverDetails />}
                        />
                        <Route path='/teams' element={<Teams />} />
                        <Route
                            path='/teams/:constructorId'
                            element={<TeamDetails />}
                        />
                        <Route path='/races' element={<Races />} />
                        <Route path='/races/:round' element={<RaceDetails />} />
                    </Routes>
                </ScrollToTop>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
