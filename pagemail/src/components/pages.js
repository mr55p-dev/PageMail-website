import { useEffect, useState } from "react"
import { LoadingButton } from "./loading";

function Page(props) {
    return (
        <>
            <h1>{props.title}</h1>
            <p>{props.body}</p>
            <br/>
        </>
    )
} 

export function SavedPageView(props) {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadPages = () => {
        setLoading(true);
        const fetchedPages = async () => {
            const response = await props.pageCall("GET", "/page/mypages", true, null);
            setPages(response ? response : [])
            setLoading(false)
        }

        try {
            fetchedPages();
        } catch {
            console.log("The request failed.")
        }
    }

    useEffect(() => {
        loadPages()
    }, [])
    return (
        <>
            <LoadingButton loading={loading} reloadCallback={loadPages} />
            {(pages !== [])
            ? pages.map(item => (<Page title={item.page_url} body={item.page_url} key={item.id} />))
                : <p>Pages is null.</p>}
        </>
    )
}