import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Navigation } from './components/navigation.js';
import { LoginPage } from './components/login';
import { SignUp } from './components/signup';
import { SavedPageView } from './components/pages';
import { UserView } from './components/user';
import { Alert, Button } from 'react-bootstrap';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('login_token') ? true : false);
  const [redirect, setRedirect] = useState(null);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [failure, setFailure] = useState('');
  const API_ROOT = process.env.REACT_APP_API_ROOT;

  // Set up a global "loading" property and have all the "setLoading" logic and try catch blocks in
  // an application level function cause typing this out is too hard...



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

  function handleError(response) {
    if (!response.ok) {
      // console.log("THROWING ERROR")
      throw Error(response.text)
    } else {
      return response
    }
  }

  // API post method
  function POSTToAPI(method, route, auth_headers, body) {
    // Set the headers
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (auth_headers) {
      headers.Authorization = "Bearer " + localStorage.getItem('login_token');
    }
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
    .catch(error => {
      console.log("CAUGHT ERROR")
      setFailure('Something went wrong connecting to our servers, please try again.')
    })
    return response
  }

  // Keep the token in a variable in case it is needed (probably wont be soon - replace with a function like below)
  useEffect(() => {
    setAccessToken(localStorage.getItem('login_token'))
  }, [loggedIn])
  // Proabbly less memory intensive and a drop in replacment.
  // const accessToken = () => {localStorage.getItem('login_token')}

  useEffect(() => {
    console.log(failure)
  }, [])

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} />
      <BrowserRouter>
      {redirect ? <Redirect to={redirect} /> : null}
        <Switch>
          <Route path="/login">
            <h1>Log in</h1>
            {loggedIn ? <p>You are already logged in.</p> : <LoginPage loginCall={POSTToAPI} redirect={setRedirect} loginStatus={setLoggedIn} prefillEmail={setPrefillEmail} />}
          </Route>
          <Route path="/signup">
            <h1>Sign up</h1>
            {loggedIn ? <p>You are already logged in.</p> : <SignUp signupCall={POSTToAPI} redirect={setRedirect} loginStatus={setLoggedIn} prefillEmail={prefillEmail} />}
          </Route>
          <Route path="/pages">
            <h1>User Pages</h1>
            {loggedIn ? <SavedPageView pageCall={POSTToAPI} /> : <p>Not logged in</p>}
          </Route>
          <Route path="/user">
            <h1>User information</h1>
            {loggedIn ? <UserView profileCall={POSTToAPI} /> : <p>Not logged in.</p>}
          </Route>
          <Route path="/token">
            <h1>Token:</h1>
            <p>{accessToken ? accessToken : "No token"}</p>
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
      <Alert show={(failure !== '')} variant="warning" onClose={() => setFailure('')} dismissible transition>{failure}</Alert>
    </div>
  );
}

export default App;
