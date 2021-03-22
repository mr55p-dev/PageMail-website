import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';

export function SignUp(props) {

const submitForm = async (event) => {
  event.preventDefault();
  // Construct the form
  const form = new URLSearchParams()
  form.append("email", event.target[0].value)
  form.append("name", event.target[1].value)
  form.append("password", event.target[2].value)

  // Register the user
    const data = await props.signupCall("POST", "/user/register", false, form);
    if (data) {
      localStorage.setItem('login_token', data.token.access_token);
      props.loginStatus(true);
      props.redirect('/user');
      props.success("Success - Check your inbox for a confirmation email!")
    }
  }

  const handleLogin = () => {props.redirect('/login')}

  return (
    <>
      <Container fluid>
        <Row>
            <Col xl={4} md={8} xs={12} className="mx-auto">
              <Container color="primary" className="form-container bg-active">
                <Form id="signupForm" onSubmit={submitForm}>
                  <Form.Group controlId="formBasicEmail" name="signup_email" id="signup_email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" defaultValue={props.prefillEmail} />
                  </Form.Group>

                  <Form.Group controlId="formBasicName" name="signup_name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Your name" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" name="signup_password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Row>
                    <Col sm={12} xl={6}>
                      <Button block variant="secondary" type="button" onClick={handleLogin}>Log in</Button>
                    </Col>
                    <Col sm={12} xl={6}>
                    <Button
                                block
                                variant="primary"
                                type="submit"
                                disabled={props.loading}>
    {props.loading
    ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Loading</>
    : "Sign Up"}</Button>                    </Col>
                  </Row>
                </Form>

              </Container>
            </Col>
          </Row>
        </Container>
      </>
  )
}