import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, CardDeck } from 'react-bootstrap';
import { LoadingButton } from "./loading";

function Page(props) {
    return (
        <Col xl={4} md={6} xs={12} className="my-2">
            <Card>
                <Card.Body className="flex-fill">
                    <Card.Title className="text-center text-overflow">{props.title ? props.title : props.url}</Card.Title>
                    <Card.Text className="text-overflow">
                        {props.description
                        ? props.description
                        : "A description of this site could not be found."}
                        <Row className="my-auto">
                            {/* <Col xl={4} sm={12} className="mt-1">
                                <Button block variant="info" onClick={() => {}}>Mark Read</Button>
                            </Col> */}
                            <Col xl={6} sm={12} className="mt-1">
                                <Button block variant="primary" onClick={() => window.open(props.url)}>Open</Button>
                            </Col>
                            <Col xl={6} sm={12} className="mt-1">
                                <Button
                                block
                                data-id={props.id}
                                data-url={props.url}
                                variant="warning"
                                onClick={e => props.deleteCallback(e.target.dataset)}>Delete</Button>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <p className="text-muted" className="text-overflow"><small>Source: {props.url}<br/>Added on: {props.date}</small></p>
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
            console.log(response)
        }
        fetchedPages();
    }, [pageCall])

    const deletePage = async (page) => {
        const form = new URLSearchParams();
        form.append("id", page.id);

        const response = await pageCall("DELETE", "/page/delete", true, form)
        if (response) {
            props.danger("Page " + page.url + " deleted.")
            loadPages()
        }
    }

    useEffect(() => {
        loadPages()
    }, [loadPages])

    return (
        <>
        <Container fluid className="cardDeckContainer mx-auto">
            <CardDeck>
            {(pages !== [])
            ? pages.map(item => (<Page
                title={item.title}
                id={item.id}
                url={item.url}
                date={item.date_added} 
                description={item.description} 
                deleteCallback={deletePage}
                key={item.id} />))
            : null}
            </CardDeck>
            <Row className="justify-content-center mx-0 my-1">
                <Col lg={2} sm={4} xs={12}>
                    <LoadingButton block loading={props.loading} reloadCallback={loadPages} />
                </Col>
            </Row>
        </Container>

        </>
    )
}