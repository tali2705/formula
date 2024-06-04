import { NavLink } from "react-router-dom";
import hplogo from "../../assets/homepage-logo.png";
const Home = () => {
  return (
    <nav className="homepage">
      <div className="homepage-logo">
        <img src={hplogo} alt="Homepage logo" />
      </div>
      <div className="homepage-links">
        <NavLink className="link" to="/drivers">Drivers</NavLink>
        <NavLink className="link" to="/teams">Teams</NavLink>
        <NavLink className="link" to="/races">Races</NavLink>
      </div>
    </nav>
  );
};
export default Home;