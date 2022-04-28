import logo from '../../images/logo.png';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import './Header.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='navbar' sticky='top'>
            <Container className='site-mw nav-container'>
                <Navbar.Brand as={Link} to='/' ><img src={logo} alt="Art Gallery" className='logo' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-items">
                        <Nav.Link as={Link} to='/' >Home</Nav.Link>
                        <Nav.Link as={Link} to='/blogs' >Blogs</Nav.Link>
                        <div className='buttons'>
                            {
                                user ? <>
                                    <Nav.Link as={Link} to='/manage-items' >Manage Items</Nav.Link>
                                    <Nav.Link as={Link} to='/add-item' >Add Item</Nav.Link>
                                    <Nav.Link as={Link} to='/my-items' >My Items</Nav.Link>
                                    <Button variant='outline-danger' className='mx-1' onClick={() => signOut(auth)}>Logout</Button>
                                </> : <>
                                    <Button variant='outline-primary' className='mx-1' as={Link} to='/login'>Login</Button>
                                    <Button variant='primary' className='mx-1' as={Link} to='/register'>Register</Button>
                                </>
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;