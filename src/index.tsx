import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './form.css'
import reportWebVitals from './reportWebVitals';
import Login from './Pages/login';
import Signup from './Pages/signup';
import Home from './Pages/home';
import Article from './Pages/article';
import Articles from './Pages/articles';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios';



//axios making the api default
axios.defaults.baseURL = "http://localhost:7070/api/v1"
axios.defaults.withCredentials = true


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/main" element={<App />}></Route>
    <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/allposts' element={<Articles/>}></Route>
        <Route path='/post/:id' element={<Article/>}></Route>
      </Routes>
    
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
