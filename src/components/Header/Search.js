import React, { useState, useEffect } from 'react';

const Search = () => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {}, []);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Search...'
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default Search;
