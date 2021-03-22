import { Button, Spinner } from 'react-bootstrap';

export function LoadingButton(props) {
    return (
        <>
        <Button
        block = {props.block}
        variant={props.variant ? props.variant :"primary"}
        disabled={props.loading}
        onClick={props.reloadCallback}>
            {props.loading
            ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Loading</>
            : (props.buttonText) ? props.buttonText : "Reload"}
        </Button>
        </>
    )
}

