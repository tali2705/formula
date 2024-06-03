const Search = ({ className, onChangeHandler }) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder="Search..."
    onChange={onChangeHandler}
  />
);
export default Search;
