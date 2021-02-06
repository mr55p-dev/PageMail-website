import { Button, Form, Modal } from 'react-bootstrap';

export function SignUp(props) {

const submitForm = async (event) => {
  event.preventDefault();
  const form = new URLSearchParams()
  form.append("email", event.target[0].value)
  form.append("name", event.target[1].value)
  form.append("password", event.target[2].value)

  const response = await props.signupCall(form);
}
return (
  <>
    <Modal show={props.show} onHide={props.handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sign up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="signupForm" onSubmit={submitForm}>
          <Form.Group controlId="formBasicEmail" name="signup_email" id="signup_email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" defaultValue={props.emailPrefill} />
          </Form.Group>

          <Form.Group controlId="formBasicName" name="signup_name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your name" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" name="signup_password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleHide}>Close</Button>
        <Button variant="primary" type="submit" form="signupForm">Save Changes</Button>
      </Modal.Footer>
    </Modal>
    </>
)
}