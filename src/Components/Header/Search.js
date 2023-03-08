import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import { GlobalContext } from "../GlobalContext";

function Search() {
    const { handleChange } = useContext(GlobalContext)
    return (
        <div className="search">
            <Container>
                <div id="search-area" className="searchArea">
                    <input id="search" name="search"  type="search" onChange={handleChange} className="input" placeholder="Enter product or category name" /><FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </Container>
        </div>
    )
}
export default Search