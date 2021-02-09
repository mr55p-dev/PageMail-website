import { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap";
import { LoadingButton } from './loading';

export function UserView(props) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const loadInformation = () => {
        setLoading(true);
        const fetchProfile = async () => {
            const response = await props.profileCall("GET", "/user/self", true, null)
            await sleep(1000)
            setLoading(false)
            setUserInfo(response)
        }

        try {
            fetchProfile()
        } catch {
            console.log("The request failed.")
        }
    }
    useEffect(() => {
        loadInformation()
    }, [])
    return (
        <>
        <LoadingButton loading={loading} reloadCallback={loadInformation} />
            {userInfo
            ? <>
                <p>ID: {userInfo.id}</p>
                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                <p>Date Added: {userInfo.date_added}</p>
            </>
            : <p>Loading</p>}
        </>
    )
}