import { NavLink } from "react-router-dom";
import hplogo from "../../assets/homepage-logo.png";
const Home = () => {
  return (
    <nav className="homepage">
      <div className="homepage-logo">
        <img src={hplogo} alt="Homepage logo" />
      </div>
      <div className="homepage-links">
        <NavLink to="/drivers">Drivers</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/races">Races</NavLink>
      </div>
    </nav>
  );
};
export default Home;