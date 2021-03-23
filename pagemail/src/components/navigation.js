import { Navbar, Nav } from 'react-bootstrap';

export function Navigation(props) {
    return (
    <>
        <Navbar bg="primary" expand="sm" variant="dark">
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav mr-auto">
            <Navbar.Brand href="/">PageMail</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#/getstarted">Get Started</Nav.Link>
              { props.loggedIn ?
              <>
              <Nav.Link href="#/pages">Pages</Nav.Link>
              <Nav.Link href="#/save">Save a page</Nav.Link></>
              : <></>}
            </Nav>
          </Navbar.Collapse>
          <Nav.Link href="#/user"></Nav.Link>
          <Nav>{ props.loggedIn
            ? <>
            <Navbar.Text>You are signed in as: <a href="#/user" className="mr-2">{props.username ? props.username : "Profile"}</a></Navbar.Text></>
            : <>
            <Nav.Link href="#/signup">Sign up!</Nav.Link>
            <Nav.Link href="#/login">Log in</Nav.Link> </> }
          </Nav>
        </Navbar>
    </>
    )
}

