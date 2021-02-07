import { useEffect, useState } from "react"

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
    const [pages, setPages] = useState([])
    const call = props.pageCall
    useEffect(() => {
        const fetched_pages = async () => {
            const response = await call("GET", "/page/mypages", true, null);
            setPages(response)
        }
        try {
            fetched_pages();
        } catch {
            console.log("The request failed.")
        }
    }, [call])
    return (
        <>
            {pages ? pages.map(item => (
                <Page title={item.page_url} body={item.page_url} key={item.id} />
                )) : <p>Pages is null.</p>}
        </>
    )
}