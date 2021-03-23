import { Button, Form, Row, Col, Container , Spinner} from "react-bootstrap";

export function LoginPage(props) {
    const submitForm = async (event) => {
        event.preventDefault();
        // Construct form
        const form = new URLSearchParams()
        form.append("username", event.target.form[0].value)
        form.append("password", event.target.form[1].value)
        form.append("page_only", 0)
        // Fetch and store the token
        const data = await props.loginCall('POST', '/user/token', false, form);
        if (data) {
            localStorage.setItem("login_token", data.access_token);
            localStorage.setItem("username", data.user.name);
            props.username("data.user.name")
            props.loginStatus(true);
            props.redirect('/pages')
        }
    }

    const handleSignup = (e) => {
        e.preventDefault()
        props.prefillEmail(e.target.form[0].value)
        props.redirect('/signup')
    }

    return (
    <>
    <Container fluid>
        <Row>
            <Col xl={4} md={8} xs={12} className="mx-auto">
                <Container color="primary" className="form-container bg-active">
                    <Form id="loginForm" onSubmit={submitForm}>
                        <Form.Group controlId="formBasicEmail" name="signup_email" id="signup_email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" name="signup_password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Row>
                            <Col sm={12} xl={6}>
                        <Button block variant="secondary" type="button" onClick={handleSignup}>Sign Up</Button>
                            </Col>
                            <Col sm={12} xl={6}>
                                <Button
                                block
                                variant="primary"
                                type="submit"
                                onClick={submitForm}
                                disabled={props.loading}>
    {props.loading
    ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Loading</>
    : "Log in"}</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Col>
        </Row>
    </Container>
    </>
    )
}

export function LoggedInPage(props) {
    return(
        <Container>
            <h4 className="display-4">You are already logged in</h4>
            <p className="lead">Please use the navigation at the top to find your pages, save a new page or view your account information.</p>
        </Container>
    )
}