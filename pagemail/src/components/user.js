import { useEffect, useState } from "react"
import { Container, Form, Row, Col } from "react-bootstrap";
import { LoadingButton } from './loading';

export function UserView(props) {
    const [userInfo, setUserInfo] = useState(null);

    const loadInformation = () => {
        const fetchProfile = async () => {
            const response = await props.profileCall("GET", "/user/self", true, null)
            setUserInfo(response ? response : null)
        }
        fetchProfile()

    }
    useEffect(() => {
        loadInformation()
    }, [])
    
    return (
        <>
        <Container fluid>
            <Row>
                <Col xl={4} md={8} xs={12} className="mx-auto">
                    <Container color="primary" className="form-container bg-active">
                        <Form id="infoForm">
                            <Form.Group as={Row} controlId="formBasicEmail" name="infoName" id="signup_email">
                                <Form.Label column sm={2}>Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" readOnly={true} defaultValue={userInfo ? userInfo.name : ""} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formBasicEmail" name="infoEmail" id="signup_email">
                                <Form.Label column sm={2}>Email address</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="email" readOnly defaultValue={userInfo ? userInfo.email : ""} />
                                </Col>
                            </Form.Group>
                        <LoadingButton loading={props.loading} reloadCallback={loadInformation} />
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
        </>
    )
}