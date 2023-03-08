import '../App.css';
import React, { Suspense } from 'react';
// import { Spinner } from 'react-bootstrap';
// import ProductsCarousel from '../Components/Carousel';
// import Footer from '../Components/Footer';
import Header from '../Components/Header/Header';
import Hero from '../Components/HeroSection/Hero';
// const AllItems = React.lazy(() =>
//     import('../Components/AllProducts')
// )

function Home() {
    return(
    <div>
        <Header/>
        <Hero/>
        {/* <div className='body'>
            <ProductsCarousel />
            <Suspense fallback={<Spinner />}><AllItems /></Suspense>
        </div>
        <Footer/> */}
    </div>
    )
}
export default Home;