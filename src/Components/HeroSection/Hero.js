import React, { useState } from 'react'
import UserSearch from '../UserSearch/UserSearch'
import './Hero.css'
import heroImage from './Hero.jpg'

function Hero() {
    const [getUserModal, setGetUserModal] = useState(false)
    const getUser = () => {
        setGetUserModal(true)
    }
    return (
        <div className='hero'>
            <img src={heroImage} alt='hero' />
            <div>
                <p className='yellow-text' onClick={getUser}>Get a user profile</p>
                <p><a href='/' className='green-text'>Check orders</a></p>
            </div>
            <div>
                <p><a href='/' className='purple-text'>Users Feedbacks & Suggestions</a></p>
                <p><a href='/' className='orange-text'>Terms & Conditions</a></p>
            </div>
            {getUserModal && <UserSearch setModal={setGetUserModal}/>}
            <div>
                <p><a href='#search' className='red-text'>Check for a product</a></p>
                <p><a href='/create-product' className='dark-text'>Enter a new product</a></p>
            </div>
        </div>
    )
}

export default Hero