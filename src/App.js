import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home.js';
import ProductUploadPage from './Pages/ProductUploadPage.js';
import ProductDetailPage from './Pages/ProductDetailPage.js';
import UserSearchPage from './Pages/UserSearchPage.js';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-product" element={<ProductUploadPage/>} />
        <Route path="/user-search/:_id" element={<UserSearchPage/>} />
        <Route path="/product/:_id" element={<ProductDetailPage/>} />
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
