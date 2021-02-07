import { Button, Form } from "react-bootstrap";

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
                props.redirect('/user')
            } else {
                alert('Something went wrong!');
            }
        } catch {
            console.log("Something went wrong.")
        }
    }

    return (
    <>
        <Form id="loginForm" onSubmit={submitForm}>
            <Form.Group controlId="formBasicEmail" name="signup_email" id="signup_email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" name="signup_password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
        </Form>
        <Button variant="primary" type="submit" form="loginForm">Log in</Button>
        </>
    )
}