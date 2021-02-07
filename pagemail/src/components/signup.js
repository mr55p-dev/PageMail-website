import { Button, Form } from 'react-bootstrap';

export function SignUp(props) {

const submitForm = async (event) => {
  event.preventDefault();
  //
  const form = new URLSearchParams()
  form.append("email", event.target[0].value)
  form.append("name", event.target[1].value)
  form.append("password", event.target[2].value)

  // Register the user
  try {
    const data = await props.signupCall("POST", "/user/register", false, form);
    if (data.token.access_token) {
      localStorage.setItem('login_token', data.token.access_token);
      props.loginStatus(true);
      props.redirect('/user')
    } else {
      alert('Something went wrong!');
      console.log(data)
    }
  } catch {
      alert('request failed.')
    }
  }

  return (
    <>
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
      <Button variant="primary" type="submit" form="signupForm">Submit</Button>

      </>
  )
}