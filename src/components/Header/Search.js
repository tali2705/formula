import { FaSearch } from "react-icons/fa";
const Search = ({ className, onChangeHandler }) => (
  <div className="search-box">
    <FaSearch className="search-icon" />
    <input type="search" placeholder="Search..." onChange={onChangeHandler} />
  </div>
);
export default Search;
