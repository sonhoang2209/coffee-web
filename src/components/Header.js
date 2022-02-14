import React from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useViewport } from "./Functions";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

export default function Header() {
    const check = useViewport()

    return (
        <div className={check ? "container-main header" : "main header"}>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">S Coffee</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="#action1">Order</Nav.Link>
                            <Nav.Link href="#action2">New Feed</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login" id='button-user'>
                                <div className="border-icons"><PermIdentityOutlinedIcon /></div>
                            </Nav.Link>
                            <Nav.Link href="/Orders">
                                <div className="border-icons"><ShoppingCartOutlinedIcon /></div>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
