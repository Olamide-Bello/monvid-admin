import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import { GlobalContext } from "../GlobalContext.js";

function Search({ showSearch }) {
    const { handleChange, matches, normalScreen } = useContext(GlobalContext)
    return (
        <div className={(matches && "mobile-search") || (showSearch && normalScreen && "normal-search") || "search"}>
            <div id="search-area" className="searchArea">
                <input id="search" name="search" type="search" onChange={handleChange} className="input" placeholder="Enter product or category name" /><FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}
export default Search