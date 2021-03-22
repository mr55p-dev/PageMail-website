import { useCallback, useEffect, useState } from "react"
import { Container, Form, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { LoadingButton } from './loading';

export function UserView(props) {
    const profileCall = props.profileCall;
    const [userInfo, setUserInfo] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleOpen = () => {setDeleteModal(true)}
    const handleClose = () => {setDeleteModal(false)}

    const loadInformation = useCallback(() => {
        const fetchProfile = async () => {
            const response = await profileCall("GET", "/user/self", true, null)
            setUserInfo(response ? response : null)
        }
        fetchProfile()
    }, [profileCall])

    const deleteAccount = async (event) => {
        event.preventDefault();

        const form = new URLSearchParams()
        form.append("email", userInfo.email);
        form.append("password", event.target.form[1].value);

        const response = await profileCall("DELETE", "/user/remove", false, form)
        if (response) {
            props.success("Account sucessfully deleted.")
            props.signOut()
        }
    }

    useEffect(() => {
        loadInformation()
    }, [loadInformation])

    return (
        <>
        <Modal centered show={deleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete your account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This is a permanant action. All pages and associated content will be deleted.
                <hr></hr>
                <Form id="deletionForm" onSubmit={deleteAccount}>
                        <Form.Group controlId="formBasicEmail" name="deletion_email" id="deletion_email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" readOnly placeholder={userInfo ? userInfo.email : ""} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" name="signup_password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Row>
                            <Col sm={12} xl={6}>
                        <Button block variant="secondary" type="button" onClick={handleClose}>Go back</Button>
                            </Col>
                            <Col sm={12} xl={6}>
                                <Button
                                block
                                variant="danger"
                                type="submit"
                                onClick={deleteAccount}
                                disabled={props.loading}>
                                {/* <LoadingButton block variant="danger" buttonText="Delete account" loading={props.loading} reloadCallback={deleteAccount} /> */}

    {props.loading
    ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Loading</>
    : "Delete Account"}</Button>
                            </Col>
                        </Row>
                    </Form>
            </Modal.Body>
        </Modal>
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
                            <Row>
                                <Col>
                                    <Button block variant="warning" onClick={props.signOut}>Sign out</Button>
                                </Col>
                                <Col>
                                    <LoadingButton block={true} loading={props.loading} reloadCallback={loadInformation} />
                                </Col>
                            </Row>
                            <Row className="my-1">
                                <Col>
                                    <Button block variant="danger" onClick={handleOpen}>Delete account</Button>
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