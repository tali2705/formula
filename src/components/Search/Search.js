import React from "react";
import { useState } from "react";

const Search = () => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = async (e) => {
        setInputValue(e.target.value);
        console.log(inputValue);
    }

    return (
        <div>
            <input type="text" placeholder="Search..." value={inputValue} onChange={handleChange} />
        </div>
    )
}

export default Search;