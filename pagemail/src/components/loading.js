import { Button, Spinner } from 'react-bootstrap';

export function LoadingButton(props) {
    return (
        <>
        <Button
        variant="primary"
        disabled={props.loading}
        onClick={props.reloadCallback}>
            {props.loading
            ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Loading</>
            : props.buttonText}
        </Button>
        </>
    )
}

