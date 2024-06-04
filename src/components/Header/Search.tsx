import React from 'react';
import { FaSearch } from 'react-icons/fa';

import { ISearchProps } from '../Interfaces/GlobalInterface';

const Search: React.FC<ISearchProps> = ({ onChangeHandler }) => (
    <div className='search-box'>
        <FaSearch className='search-icon' />
        <input
            type='search'
            placeholder='Search...'
            onChange={onChangeHandler}
        />
    </div>
);

export default Search;
