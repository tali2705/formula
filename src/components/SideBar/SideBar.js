import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import logo from "../../assets/formula1-logo.png";

import Races from "../Races/Races";
import RaceDetails from "../Races/RaceDetails";

import Teams from "../Teams/Teams";
import TeamDetails from "../Teams/TeamDetails";

import Drivers from "../Drivers/Drivers";
import DriverDetails from "../Drivers/DriverDetails";

const SideBar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="logo">
        <img src={logo} style={{ width: "20%" }} alt="logo" />
      </div>
      <Router>
        <nav className="side-nav">
          <ul className="side-nav-items">
            <li className="side-nav-item">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Drivers
              </NavLink>
            </li>

            <li className="side-nav-item">
              <NavLink
                to="/teams"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Teams
              </NavLink>
            </li>

            <li className="side-nav-item">
              <NavLink
                to="/races"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Races
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Drivers />} />
          <Route path="/:driverId" element={<DriverDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:constructorId" element={<TeamDetails />} />
          <Route path="/races" element={<Races />} />
          <Route path="/races/:round" element={<RaceDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default SideBar;
