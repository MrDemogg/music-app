import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {musicSlice} from "../../store/reducers/MusicSlice";
import UserAvatar from "../UserAvatar";

const NavBar = () => {
  const router = useNavigate()
  const endpoint = useLocation()
  const dispatch = useAppDispatch()

  const navHandler = (endpoint: string) => {
    router(endpoint)
    dispatch(musicSlice.actions.setError(null))
    dispatch(musicSlice.actions.setGlobalIsError(false))
  }

  return (
    <div>
    <Navbar key='sm' bg="dark" variant='dark' expand='sm' className="mb-3 position-fixed w-100 top-0" style={{zIndex: 1}}>
      <Navbar.Brand color={'#fff'} style={{position: 'absolute', width: 50, left: 0, right: 0, margin: '0 auto'}}>{endpoint.pathname.slice(1, 7)}</Navbar.Brand>
      <Container fluid>
        <UserAvatar />
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link onClick={() => navHandler('/artists')}>Artists</Nav.Link>
          <Nav.Link onClick={() => navHandler('/albums')}>Albums</Nav.Link>
          <Nav.Link onClick={() => navHandler('/tracks')}>Tracks</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
  );
};

export default NavBar;