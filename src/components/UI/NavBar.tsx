import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

const NavBar = () => {
  const router = useNavigate()
  const endpoint = useLocation()

  return (
    <div>
    <Navbar key='sm' bg="dark" variant='dark' expand='sm' className="mb-3 position-fixed w-100 top-0" style={{zIndex: 1}}>
      <Container fluid style={{width: '100%'}}>
        <Navbar.Brand color={'#fff'} style={{width: '51.4%', display: 'flex', justifyContent: 'right'}}>{endpoint.pathname.slice(1, 7)}</Navbar.Brand>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link onClick={() => router('/artists')}>Artists</Nav.Link>
          <Nav.Link onClick={() => router('/albums')}>Albums</Nav.Link>
          <Nav.Link onClick={() => router('/tracks')}>Tracks</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
  );
};

export default NavBar;