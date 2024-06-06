import React from 'react';

import { ISearchProps } from '../Interfaces/GlobalInterface';

import { FaSearch } from 'react-icons/fa';

import SearchBoxWrapper from './Search.styles';

const Search: React.FC<ISearchProps> = ({ onChangeHandler }) => (
    <SearchBoxWrapper>
        <FaSearch className='search-icon' />

        <input
            type='search'
            placeholder='Search...'
            onChange={onChangeHandler}
        />
    </SearchBoxWrapper>
);

export default Search;
