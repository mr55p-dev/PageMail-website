import { Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';

export function Hero(props) {
    return (
        <>
            <Jumbotron fluid className="py-5 px-3">
                <h1 className="display-3">Pagemail</h1>
                <p className="lead">Read it later, straight to your inbox.</p>
                <hr className="my-4" />
                <p className="lead">
                    <Button bg="primary" size="lg" onClick={props.handleShow}>Sign Up!</Button>
                </p>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export function HeroNew(props) {
    const handleInput = (event) => {props.emailPrefill(event.target.value)}
    const submitForm = (event) => {
        event.preventDefault();
        props.handleShow();
    }
    return (
        <Container fluid className="my-5" bg="primary">
            <Row>
                <Col md={10} className="mx-auto">
                    <h1 className="display-3 my-2">Pagemail</h1>
                    <p className="lead">Read it later, straight to your inbox.</p>
                    <hr className="my-4" />
                    <Form onSubmit={submitForm}>
                        <Form.Row>
                            <Col md={10} xs={12} className="my-2">
                                <Form.Control type="email" size="lg" onChange={handleInput} placeholder='Enter your email to get started...' />
                            </Col>
                            <Col md={2} xs={12} className="my-2">
                                <Button bg="primary" size="lg" block="true" type="button" onClick={props.handleShow}>Sign up!</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}