import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Teams from './components/Teams/Teams';
import TeamDetails from './components/Teams/TeamDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/teams' element={<Teams />} />
                <Route path='/teams/:teamId' element={<TeamDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
