import { Navbar, Nav } from 'react-bootstrap';

export function Navigation() {
    return (
    <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#">PageMail</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>About</Nav.Link>
              <Nav.Link>Sign up!</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </>
    )
}

