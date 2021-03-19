import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { LoadingButton } from "./loading";

function Page(props) {
    return (
        <Col xl={3} md={6} xs={12} className="my-2 d-flex">
            <Card>
                <Card.Body className="flex-fill">
                    <Card.Title className="text-center">{props.title}</Card.Title>
                    <Card.Text>
                        {props.description}
                        <Row className="my-auto">
                            <Col xl={4} sm={12} className="mt-1">
                                <Button block variant="warning" onClick={() => {}}>Delete</Button>
                            </Col>
                            <Col xl={4} sm={12} className="mt-1">
                                <Button block variant="info" onClick={() => {}}>Mark Read</Button>
                            </Col>
                            <Col xl={4} sm={12} className="mt-1">
                                <Button block variant="primary" onClick={() => window.open(props.url)}>Open</Button>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small>Added at {props.date}</small>
                </Card.Footer>
            </Card>
        </Col>
        )
}

export function SavedPageView(props) {
    const pageCall = props.pageCall;
    const [pages, setPages] = useState([]);
    const loadPages = useCallback(() => {
        const fetchedPages = async () => {
            const response = await pageCall("GET", "/page/mypages", true, null);
            setPages(response ? response : [])
        }
        fetchedPages();
    }, [])

    useEffect(() => {
        loadPages()
    }, [loadPages])

    return (
        <>
        <Container fluid className="cardDeckContainer mx-auto">
            <Row>
            {(pages !== [])
            ? pages.map(item => (<Page title={item.title} url={item.page_url} date={item.date_added} description={item.description} key={item.id} />))
            : null}
            </Row>
            <LoadingButton loading={props.loading} reloadCallback={loadPages} />
        </Container>

        </>
    )
}