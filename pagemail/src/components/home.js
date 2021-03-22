import { Container } from 'react-bootstrap';

export const HomeView = () => {
    return <>
        <Container>
            {/* <h2 className="">Welcome <small className="text-muted">What is PageMail?</small></h2> */}
            <h2 className="display-2">Pagemail</h2>
            <p className="lead">We are a service for bookmarking websites you want to come back to later. Instead of losing pages in expensive read-it-later services or browser bookmarks, you can have them delivered to your inbox in a simple list to make it easy to pick up where you left off.</p>
            <p className="lead">This site is still under construction, so please bear in mind that not everything will be working! If you find a bug, please <a href="mailto:elunnon.pagemail@gmail.com">send us an email here</a> , or file an issue on <a href="https://github.com/mr55p-dev/PageMail-website">GitHub</a>.</p>

        </Container>
    </>
}