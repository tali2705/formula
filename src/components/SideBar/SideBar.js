import { NavLink } from "react-router-dom";
import logo from "../../assets/FI-logo_rendered.png";

const SideBar = () => {
  return (
    <div className="sidebar-wrapper">
      <img className="logo" src={logo} alt="logo" />
      <nav className="side-nav">
        <NavLink
          to="/drivers"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Drivers
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Teams
        </NavLink>
        <NavLink
          to="/races"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Races
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
