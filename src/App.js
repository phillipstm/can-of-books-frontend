'Use strict'
import Header from './Header';
import React from 'react';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './About';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Button, Container, Form } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route 
              exact path="/About"
              element={<Profile />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
