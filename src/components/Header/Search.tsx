import React from 'react';

import { ISearchProps } from '../Interfaces/GlobalInterface';

const Search: React.FC<ISearchProps> = ({
    className = '',
    placeholder,
    onChangeHandler,
}) => (
    <input
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onChangeHandler}
    />
);

export default Search;
