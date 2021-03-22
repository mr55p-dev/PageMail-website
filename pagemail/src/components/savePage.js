import { Button, Form, Row, Col, Container , Spinner} from "react-bootstrap";

export function SavePageView(props) {
    const submitForm = async (event) => {
        event.preventDefault();
        // Construct form
        const form = new URLSearchParams()
        form.append("url", event.target.form[0].value)

        // Fetch and store the token
        const data = await props.saveCall('POST', '/page/save', true, form);
        if (data) {
            props.success("Saved!")
        }
    }

    return (
    <>
    <Container fluid>
        <Row>
            <Col xl={3} md={4} xs={12} className="mx-auto">
                <Container color="primary" className="form-container bg-active">
                    <Form id="loginForm" onSubmit={submitForm}>
                        <Form.Group controlId="formBasicEmail" name="signup_email" id="signup_email">
                            <Form.Label>Page address</Form.Label>
                            <Form.Control type="url" defaultValue="https://" />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button
                                block
                                variant="primary"
                                type="submit"
                                onClick={submitForm}
                                disabled={props.loading}>
    {props.loading
    ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>Loading</>
    : "Submit"}</Button>
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