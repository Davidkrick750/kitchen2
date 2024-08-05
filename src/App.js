import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter.js";
import {observer} from "mobx-react-lite";
import './App.css';
import './pages/css/style.css'
import Footer from './Footer.js'
import NavBar from './NavBar.js'
import ScrollToTop from './ScrollTop.js';
import Nav from './Nav.js';

const App = observer(() => {


    return (
        
        <> 



          <BrowserRouter >
          <Nav/>
          <ScrollToTop/>
          <AppRouter /> 
    <Footer/>
      </BrowserRouter>

          {/* )} */}
        </>

    );
    
});

export default App;