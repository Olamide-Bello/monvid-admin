import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import GlobalState from './Components/GlobalContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalState>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

