import Navbar from "react-bootstrap/esm/Navbar";
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
// import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import './Header.css'
import Search from "./Search";
import { useContext, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import SignInModal from "../SignIn/SignIn";
import SignUpModal from "../SignUp.js/SignUp";
import SearchResult from "../Result/SearchResult";

function Header() {
    const {user} = useContext(GlobalContext)
    const [openSignIn, setOpenSignIn] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const userInitials= useRef(null)

    const handleModal= () => {
        setOpenSignIn(true)
    }

    const handleSignUpModal= () => {
        setOpenSignUp(true)
    }
    const handleLogOut= async () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.reload(true)
    }
    
    useMemo(()=> {
        const copy = user.name
        const arr= typeof copy==="string" ? copy.split(" "): ""
        let initials=""
        for(let i=0; i<= 1; i++) {
            initials += typeof arr[i] === "string" ? arr[i].charAt(0).toUpperCase(): ""
        }
        userInitials.current = initials
    }, [user])
    return (
        <Navbar sticky="top" className="header">
            <div className="header-content">
                <Navbar.Brand className="brand-name"><Nav.Link as={NavLink} to="/home" end className="no-hover"><strong>monvid <span>admin</span></strong><FontAwesomeIcon icon={faHotel} /></Nav.Link></Navbar.Brand>
                <Search/>
                <Nav className="nav" >
                    <Nav.Link as={NavLink} to="/home" className="navlinks-item">About</Nav.Link>
                    
                    {!user._id && <Nav.Link as={NavLink} onClick= {handleModal} className="navlinks-item"><FontAwesomeIcon icon={faUser} /> Sign in</Nav.Link>}
                    {!user._id && <button className="account-btn" onClick={handleSignUpModal}>Create Account</button>}
                    {user.name && 
                        <div className="user-avatar">
                            <strong>{userInitials.current}</strong>
                            <div className="user-menu">
                                <div><div className="user-avatar"><strong>{userInitials.current}</strong></div><h4><strong>Welcome back, {user.name}</strong></h4></div>
                                <p><a href="/home">Change Password</a></p>
                                <p><a href="/home">Contact us</a></p>
                                <button href= "/home" className="log-out-btn" onClick={handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    }
                </Nav>
            </div>
            {openSignIn && <SignInModal setModal= {setOpenSignIn}/>}
            {openSignUp && <SignUpModal setModal={setOpenSignUp}/>}
            <SearchResult/>
        </Navbar>

    )
}
export default Header