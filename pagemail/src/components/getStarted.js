import { Container } from 'react-bootstrap';

export function GetStartedView(props) {
    return(
        <>
            <Container>
                <h4 className="display-4">Get started</h4>
                <p className="lead">
                    To get started, you can save pages straight from this website using the link <a href="#/save">here</a>.
                    We also have an iOS shortcut available, which you can enable by downloading it from <a href="https://www.icloud.com/shortcuts/282c3e1952eb4de58f8f9e98aa825e46">here</a> and
                    then using your API token, which can be found on your <a href="#/profile">profile</a> page. Once you have that, open the
                    shortcut and provide it when it is requested. You can then share any page with a URL to it and
                    we will keep track of it for you.
                </p>
            </Container>
        </>
    )
}