import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Navigation } from './components/navigation.js';
import { LoginPage } from './components/login';
import { SignUp } from './components/signup';
import { SavedPageView } from './components/pages';
import { UserView } from './components/user';
import { Footer } from './components/footer';
import { Alert, Button } from 'react-bootstrap';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('login_token') ? true : false);
  const [redirect, setRedirect] = useState(null);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState('');
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
        setAccessToken(localStorage.getItem('login_token'));
      } else {
        setLoggedIn(false);
        setAccessToken(null);
        localStorage.removeItem('username')
      }
    })
  })

  // Clean up after a signout event
  const signOut = () => {
    localStorage.removeItem('login_token');
    setLoggedIn(false);
    setRedirect('/');
  }

  // Throw an error if the response is not good.
  function handleError(response) {
    if (!response.ok) {
      throw Error(response.status)
    } else {
      setFailure('')
      return response
    }
  }

  // API post method
  async function POSTToAPI(method, route, auth_headers, body) {
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
    .catch(error => {setFailure('Something went wrong connecting to our servers, please try again. HTTP ' + error.message)})
    setLoading(false)
    return response
  }

  // Keep the token in a variable in case it is needed (probably wont be soon - replace with a function like below)
  useEffect(() => {
    setAccessToken(localStorage.getItem('login_token'))
  }, [loggedIn])
  // Proabbly less memory intensive and a drop in replacment.
  // const accessToken = () => {localStorage.getItem('login_token')}

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} />
      <Alert
        show={(failure !== '')}
        variant="warning"
        onClose={() => setFailure('')}
        dismissible
        transition>{failure}</Alert>
      <BrowserRouter>
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
              prefillEmail={prefillEmail} />}
          </Route>
          <Route path="/pages">
            {loggedIn
            ? <SavedPageView
              loading={loading}
              pageCall={POSTToAPI} />
            : <p>Not logged in</p>}
          </Route>
          <Route path="/user">
            {loggedIn
            ? <UserView
              loading={loading}
              profileCall={POSTToAPI} />
            : <p>Not logged in.</p>}
          </Route>
          <Route path="/signout">
            <p>Click to sign out</p>
            <Button onClick={signOut}>Sign out.</Button>
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
