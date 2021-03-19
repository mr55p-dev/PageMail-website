export const Footer = () => {
    return(
    <footer className="footer bg-light">
        <div className="container-fluid mx-auto mt-4">
            <div className="row">
                <div className="col-12 my-auto h-100 text-center">
                    <ul className="list-inline mb-2">
                        {/* <!-- <li className="list-inline-item"><a href="#">About</a></li>
                        <li className="list-inline-item"><span>⋅</span></li>
                        <li className="list-inline-item"><a href="#">Contact</a></li>
                        <li className="list-inline-item"><span>⋅</span></li>
                        <li className="list-inline-item"><a href="#">Terms of &nbsp;Use</a></li>
                        <li className="list-inline-item"><span>⋅</span></li>
                        <li className="list-inline-item"><a href="#">Privacy Policy</a></li> --> */}
                    </ul>
                    <p className="text-muted small mb-4 mx-auto">© Pagemail 2021. All Rights Reserved. Project hosted by <button className="btn btn-link" onClick={() => {window.open("https://pages.github.com/")}}>GitHub Pages</button>.</p>
                </div>
                <div className="col-lg-6 my-auto h-100 text-center text-lg-right mx-auto">
                    <ul className="list-inline mb-0">
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    )
}

