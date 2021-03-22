import { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, CardDeck } from 'react-bootstrap';
import { LoadingButton } from "./loading";

function Page(props) {
    return (
        <Col xl={4} md={6} xs={12} className="my-2">
            <Card>
                <Card.Body className="flex-fill">
                    <Card.Title className="text-center text-overflow">{props.title ? props.title : props.url}</Card.Title>
                    {/* Make this work */}
                    <Card.Subtitle className="text-center text-overflow">{props.url}</Card.Subtitle>
                    <Card.Text className="text-overflow">
                        {props.description}
                        <Row className="my-auto">
                            <Col xl={6} sm={12} className="mt-1">
                                <Button
                                block
                                data-id={props.id}
                                data-url={props.url}
                                variant="warning" 
                                onClick={e => props.deleteCallback(e.target.dataset)}>Delete</Button>
                            </Col>
                            {/* <Col xl={4} sm={12} className="mt-1">
                                <Button block variant="info" onClick={() => {}}>Mark Read</Button>
                            </Col> */}
                            <Col xl={6} sm={12} className="mt-1">
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
            <LoadingButton loading={props.loading} reloadCallback={loadPages} />
        </Container>

        </>
    )
}