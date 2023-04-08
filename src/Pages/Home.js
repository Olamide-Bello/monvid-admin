import '../App.css';
import React, { Suspense } from 'react';
import Header from '../Components/Header/Header.js';
import Hero from '../Components/HeroSection/Hero.js';

function Home() {
    return(
    <div>
        <Header/>
        <Hero/>
    </div>
    )
}
export default Home;