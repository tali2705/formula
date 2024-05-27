import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Search = () => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue();
    })

    const handleChange = (e) => {
        console.log(e);
        setInputValue(e);
    }

    return (
        <div>
           <input type="text" placeholder="Search..." value={inputValue} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}

export default Search;