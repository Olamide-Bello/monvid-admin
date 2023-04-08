import Navbar from "react-bootstrap/esm/Navbar.js";
import Nav from 'react-bootstrap/esm/Nav.js';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faMagnifyingGlass, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import './Header.css'
import './Mobile.css'
import Search from "./Search.js";
import { useContext, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../GlobalContext.js";
import SignInModal from "../SignIn/SignIn.js";
import SignUpModal from "../SignUp.js/SignUp.js";
import SearchResult from "../Result/SearchResult.js";

function Header() {
    const { user, logged, logOut, matches, normalScreen } = useContext(GlobalContext)
    const [openSignIn, setOpenSignIn] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const userInitials = useRef(null)

    const handleModal = () => {
        setOpenSignIn(true)
    }

    const handleSignUpModal = () => {
        setOpenSignUp(true)
    }
    const handleLogOut = async () => {
        localStorage.removeItem("admin")
        localStorage.removeItem("admin-token")
        window.location.reload(true)
        logOut()
    }

    const handleSearch = () => {
        if (normalScreen) {
            setShowSearch(!showSearch)
        }
    }

    useMemo(() => {
        const copy = user.name
        const arr = typeof copy === "string" ? copy.split(" ") : ""
        let initials = ""
        for (let i = 0; i <= 1; i++) {
            initials += typeof arr[i] === "string" ? arr[i].charAt(0).toUpperCase() : ""
        }
        userInitials.current = initials
    }, [user])
    return (
        <div className={matches ? "mobile-header" : "header"}>
            <div className="header-content">
                <Navbar.Brand className="brand-name"><Nav.Link as={NavLink} to="/home" end className="no-hover"><strong>monvid <span>admin</span></strong><FontAwesomeIcon icon={faHotel} /></Nav.Link></Navbar.Brand>
                {!matches && !normalScreen && <Search />}
                <Nav className="nav" >
                    {normalScreen && <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} size="lg" onClick={handleSearch} />}
                    {matches && !logged && <FontAwesomeIcon onClick={handleModal} style={{ color: "orangered" }} icon={faUserCircle} size="2x" />}
                    {!logged && !matches && <Nav.Link as={NavLink} onClick={handleModal} className="navlinks-item"><FontAwesomeIcon icon={faUser} /> Sign in</Nav.Link>}
                    {!logged && !matches && <button className="account-btn" onClick={handleSignUpModal}>Create Account</button>}
                    {logged &&
                        <div className="user-avatar">
                            <strong>{userInitials.current}</strong>
                            <div className="user-menu">
                                <div><div className="user-avatar"><strong>{userInitials.current}</strong></div><h4><strong>Welcome back, {user.name}</strong></h4></div>
                                <p><a href="/home">Change Password</a></p>
                                <button href="/home" className="log-out-btn" onClick={handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    }
                </Nav>
            </div>
            {matches && <Search />}
            {showSearch && normalScreen && <Search showSearch={showSearch} />}
            {openSignIn && <SignInModal setModal={setOpenSignIn} />}
            {openSignUp && <SignUpModal setModal={setOpenSignUp} />}
            <SearchResult />
        </div>

    )
}
export default Header