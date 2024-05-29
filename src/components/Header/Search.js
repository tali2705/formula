import React from 'react';

const Search = ({ className, placeholder, onChangeHandler }) => (
    <input
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onChangeHandler}
    />
);

export default Search;
