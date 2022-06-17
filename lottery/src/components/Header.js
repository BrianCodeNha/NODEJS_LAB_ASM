import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//style
import "./Header.css";

export default function Header() {
  return (
    <Navbar expand="lg" style={{backgroundColor: '#D9D9D9', paddingLeft: '10px'}} >
             
        <Navbar.Toggle className="me-auto" aria-controls="basic-navbar-nav" ><i className="fa fa-bars"/></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" style={{borderRadius: 25, backgroundColor: '#FEFEFE', paddingLeft: '10px', paddingRight: '10px'}}>
              <i className="fa fa-home"></i> Dò vé số
            </NavLink>
            <NavLink to="/veso" style={{borderRadius: 25, backgroundColor: '#FEFEFE', paddingLeft: '10px', paddingRight: '10px'}}>
              <i className="fa fa-money-check"></i> Quản Lý Vé Số
            </NavLink>
            <NavLink to="/blog" style={{borderRadius: 25, backgroundColor: '#FEFEFE', paddingLeft: '10px', paddingRight: '10px'}}>
              <i className="fa fa-blog"></i> Blog
            </NavLink>
          </Nav>
          <Nav me style={{paddingRight: '20px'}}>
          <NavLink to="/login" style={{borderRadius: 25, backgroundColor: '#FEFEFE', paddingLeft: '10px', paddingRight: '10px'}}>
              <i className="fa fa-user"></i> Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}
