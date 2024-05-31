import loader from "./assets/Kaciga.png";
const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loader} alt="Loading..." className="loader" />
      <p>Loading...</p>
    </div>
  );
};
export default Loader;
