import React from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from './Login';
import LogoutButton from './Logout';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ color: 'white' }}>
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About Us</Link></NavItem>
        <NavItem><Link to="/profile" className="nav-link">User Profile</Link></NavItem>
        {this.props.auth0.isAuthenticated ? (<LogoutButton />) : (<LoginButton />)}
      </Navbar>
    )
  }
}

export default withAuth0(Header);
