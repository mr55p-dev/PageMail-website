import { Navbar, Nav } from 'react-bootstrap';

export function Navigation() {
    return (
    <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">PageMail</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>About</Nav.Link>
              <Nav.Link href="/signup">Sign up!</Nav.Link>
              <Nav.Link href="/login">Log in</Nav.Link>
              <Nav.Link href="/user">Pages</Nav.Link>
              <Nav.Link href="/token">Token</Nav.Link>
              <Nav.Link href="/signout">Sign out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </>
    )
}

