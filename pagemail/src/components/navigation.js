import { Navbar, Nav } from 'react-bootstrap';

export function Navigation(props) {
    return (
    <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">PageMail</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav mr-auto">
            <Nav className="mr-auto">
              <Nav.Link>About</Nav.Link>
              { props.loggedIn ? <>
              <Nav.Link href="#/pages">Pages</Nav.Link>
              <Nav.Link href="#/token">Token</Nav.Link> </> : <></> }
            </Nav>
          </Navbar.Collapse>
          <Nav>{ props.loggedIn
            ? <>
            <Nav.Link href="#/user" className="mr-2">Profile</Nav.Link>
            <Nav.Link href="#/signout" className="mr-2">Sign out</Nav.Link> </>
            : <>
            <Nav.Link href="#/signup">Sign up!</Nav.Link>
            <Nav.Link href="#/login">Log in</Nav.Link> </> }
          </Nav>
        </Navbar>
    </>
    )
}

