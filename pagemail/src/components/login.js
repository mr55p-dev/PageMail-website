import { Button, Form, Row, Col, Container } from "react-bootstrap";

export function LoginPage(props) {
    const submitForm = async (event) => {
        event.preventDefault();
        // Construct form
        const form = new URLSearchParams()
        form.append("username", event.target[0].value)
        form.append("password", event.target[1].value)
        // Fetch and store the token
        try {
            const data = await props.loginCall('POST', '/user/token', false, form);
            if (data.access_token) {
                localStorage.setItem("login_token", data.access_token);
                props.loginStatus(true);
                props.redirect('/pages')
            } else {
                alert('Something went wrong!');
            }
        } catch {
            console.log("Something went wrong.")
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
                        <Button block variant="primary" type="submit">Log in</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                {/* <a href="/signup" className="text-muted mx-2">Forgot password?</a> */}
            </Col>
        </Row>
    </Container>
    </>
    )
}