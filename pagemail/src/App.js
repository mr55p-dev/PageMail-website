import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import { Navigation } from './components/navigation.js';
import { HomeView } from './components/home.js'
import { LoginPage } from './components/login';
import { SignUp } from './components/signup';
import { SavedPageView } from './components/pages';
import { SavePageView } from './components/savePage';
import { UserView } from './components/user';
import { Footer } from './components/footer';

function App() {
  // const [accessToken, setAccessToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('login_token') ? true : false);
  const [redirect, setRedirect] = useState(null);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [danger, setDanger] = useState('');
  const [failure, setFailure] = useState('');
  const [success, setSuccess] = useState('');
  const API_ROOT = process.env.REACT_APP_API_ROOT;

  // Set up a global "loading" property and have all the "setLoading" logic and try catch blocks in
  // an application level function cause typing this out is too hard...

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Listen for a saved API key - to make sure the state is always correct.
  useEffect(() => {
    window.addEventListener("storage", () => {
      if (localStorage.getItem('login_token')) {
        setLoggedIn(true);
        // setAccessToken(localStorage.getItem('login_token'));
      } else {
        setLoggedIn(false);
        // setAccessToken(null);
        localStorage.removeItem('username')
      }
    })
  })

  // Clean up after a signout event
  const signOut = () => {
    localStorage.removeItem('login_token');
    setLoggedIn(false);
    setSuccess("Signed out.")
    setRedirect('/');
  }

  // Throw an error if the response is not good.
  const handleError = useCallback(async (response) => {
    if (!response.ok) {
      const errormsg = await response.json()
      throw Error(errormsg.detail)
    } else {
      setFailure('')
      return response
    }
  }, [setFailure])

  // API post method
  const POSTToAPI = useCallback(async (method, route, auth_headers, body) => {
    setLoading(true)
    // Set the headers
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    headers.Authorization = auth_headers ? "Bearer " + localStorage.getItem('login_token') : ''
    await sleep(1000)
    // Perform the request
    const response = fetch(
      API_ROOT + route, {
        method: method,
        redirect: "follow",
        headers: headers,
        body: body
      }
    )
    .then(handleError)
    .then(response => response.json())
    .catch(error => {console.log(error);setFailure('Something went wrong: ' + error.message)})
    setLoading(false)
    return response
  }, [handleError, API_ROOT])

  // Keep the token in a variable in case it is needed (probably wont be soon - replace with a function like below)
  // useEffect(() => {
  //   setAccessToken(localStorage.getItem('login_token'))
  // }, [loggedIn])
  // Proabbly less memory intensive and a drop in replacment.
  // const accessToken = () => {localStorage.getItem('login_token')}

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} />
      <Container fluid className="my-1">
        <Alert
          show={(danger !== '')}
          variant="danger"
          onClose={() => setDanger('')}
          dismissible
          transition>{danger}</Alert>
        <Alert
          show={(failure !== '')}
          variant="warning"
          onClose={() => setFailure('')}
          dismissible
          transition>{failure}</Alert>
        <Alert
          show={(success !== '')}
          variant="success"
          onClose={() => setSuccess('')}
          dismissible
          transition>{success}</Alert>
      </Container>

      <Router>
      {redirect ? <Redirect to={redirect} /> : null}
        <Switch>
          <Route path="/login">
            {loggedIn
            ? <p>You are already logged in.</p>
            : <LoginPage
              loading={loading}
              loginCall={POSTToAPI}
              redirect={setRedirect}
              loginStatus={setLoggedIn}
              prefillEmail={setPrefillEmail} />}
          </Route>
          <Route path="/signup">
            {loggedIn ? <p>You are already logged in.</p>
            : <SignUp
              loading={loading}
              signupCall={POSTToAPI}
              redirect={setRedirect}
              loginStatus={setLoggedIn}
              success={setSuccess}
              prefillEmail={prefillEmail} />}
          </Route>
          <Route path="/pages">
            {loggedIn
            ? <SavedPageView
              loading={loading}
              danger={setDanger}
              pageCall={POSTToAPI} />
            : <p>Not logged in</p>}
          </Route>
          <Route path="/save">
              {loggedIn
              ? <SavePageView
              loading={loading}
              success={setSuccess}
              failure={setFailure}
              saveCall={POSTToAPI} />
              : <p>Not logged in</p>}
          </Route>
          <Route path="/user">
            {loggedIn
            ? <UserView
              loading={loading}
              success={setSuccess}
              signOut={signOut}
              profileCall={POSTToAPI} />
            : <p>Not logged in.</p>}
          </Route>
          {/* <Route path="/signout">
            <Container>
              <Button onClick={signOut}>Sign out.</Button>
            </Container>
          </Route>*/}
          <Route path="/">
              <HomeView />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
