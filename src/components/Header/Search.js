<<<<<<< HEAD
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Search = () => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue();
    });

    const handleChange = async (e) => {
        console.log(e);
        setInputValue(e);
    }

    return (
        <div>
            <input type="text" placeholder="Search..." value={inputValue} onChange={(e) => handleChange(e.target.value)} />
        </div>
    )
}
=======
const Search = ({ className, placeholder, onChangeHandler }) => (
    <input
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onChangeHandler}
    />
);
>>>>>>> bba38fe336bd6cf36ffe7475a3f09b80da9b954f

export default Search;