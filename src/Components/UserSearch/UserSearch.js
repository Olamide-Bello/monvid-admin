import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './UserSearch.css'
import { Link } from 'react-router-dom'

function UserSearch({ setModal }) {
    const [searchResult, setSearchResult] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const token = localStorage.getItem("admin-token");

    const handleChange = (e) => {
        console.log(e.target.value)
        setSearchKey(e.target.value)
    }
    const toggleModal = () => {
        setModal(false)
    }

    const getInitials= (name) => {
        const copy = name
        const arr= typeof copy==="string" ? copy.split(" "): ""
        let initials=""
        for(let i=0; i<= 1; i++) {
            initials += typeof arr[i] === "string" ? arr[i].charAt(0).toUpperCase(): ""
        }
        return initials
    }

    useEffect(() => {
        (async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`)
            myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };
            if (searchKey) {
                const response = await fetch(`http://localhost:3000/users/search/${searchKey}`, requestOptions)
                if (response.status === 200) {
                    const result = await response.json()
                    setSearchResult(result)
                    console.log(result)
                } else if (response.status === 404) {
                    setSearchResult([])
                }

            }
            if (searchKey === "") {
                setSearchResult([])
            }

        })
            ()
    }, [searchKey, token])

    console.log(searchResult)
    return (
        <div className='search-modal'>
            <div id='user-search-area'>
                <div className='modal-header'><h3>Search for users</h3><FontAwesomeIcon className='modal-exit' icon={faXmark} size='2x' onClick={toggleModal} /></div>
                <input value={searchKey} id="user-search" name="user-search" type="search" onChange={handleChange} className="search-input" placeholder="Enter user name to search" />
            </div>
            {searchResult && searchResult.length > 0 &&

                <div className='search-result'>
                    {
                        searchResult.map((user) => (
                            <Link to={`/user-search/${user._id}`} key={user._id} className='result-link'>
                                <div className='search-item' >
                                    <div className="user-avatar"><strong>{getInitials(user.name)}</strong></div>

                                    <div>
                                        <h5>{user.name}</h5>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </Link>

                        ))
                    }
                </div>
            }
        </div>
    )
}

export default UserSearch