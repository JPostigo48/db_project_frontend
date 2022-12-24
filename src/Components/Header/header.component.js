import React from "react";
import { Container, Col, Row, Nav, Navbar, NavItem, NavbarBrand, NavLink, NavbarText } from "reactstrap";
import { isAuthenticated, isEmployee } from "../../functions/autentication.function";
import "./header.style.css";

const Header = () => {
  const botones = () => {
    if (isAuthenticated()) {
      if (isEmployee()) {
        return (
          <NavItem >
            <NavLink className="rightabs margin-r" href="/productos/add">Añadir</NavLink>
            <NavLink className="rightabs" href="/signout">Salir</NavLink>
          </NavItem>
        )
      } else {
        return (
          <NavItem >
            <NavLink className="rightabs margin-2r" href="/compras">Compras</NavLink>
            <NavLink className="rightabs margin-r" href="/consultas">Consultas</NavLink>
            <NavLink className="rightabs" href="/signout">Salir</NavLink>
          </NavItem>
        )
      }
    }
    else {
      return (
        <NavItem >
          <NavLink className="rightabs" href="/signin">Iniciar Sesión</NavLink>
        </NavItem>
      )
    }
  }
    return (
      <div>
        <Navbar className="nav-fixed" color="dark"  dark fixed="top" full expand="md" container="fluid" >
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <Nav className="me-auto" navbar>
            {botones()}
          </Nav>
        </Navbar>
      </div>
    );
}

export default Header;
