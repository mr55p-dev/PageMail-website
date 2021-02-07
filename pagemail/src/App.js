import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Navigation } from './components/navigation.js';
import { LoginPage } from './components/login';
import { SignUp } from './components/signup';
import { SavedPageView } from './components/pages';
import { Button } from 'react-bootstrap';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('login_token') ? true : false);
  const [redirect, setRedirect] = useState(null);
  const API_ROOT = process.env.REACT_APP_API_ROOT;

  // Listen for a saved API key - to make sure the state is always correct.
  useEffect(() => {
    window.addEventListener("storage", () => {
      if (localStorage.getItem('login_token')) {
        setLoggedIn(true);
        setAccessToken(localStorage.getItem('login_token'));
        console.debug("STATE:")
        console.debug(loggedIn);
        console.debug(accessToken);
      } else {
        setLoggedIn(false);
        setAccessToken(null);
        console.debug("STATE:")
        console.debug(loggedIn);
        console.debug(accessToken);
      }
    })
  })

  // Clean up after a signout event
  const signOut = () => {
    localStorage.removeItem('login_token');
    setRedirect('/')
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
    .then(response => response.json())
    .catch(error => console.log(error))
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
      <Navigation />
      <BrowserRouter>
      {redirect ? <Redirect to={redirect} /> : null}
        <Switch>
          <Route path="/login">
            <h1>Log in</h1>
            {loggedIn ? <p>You are already logged in.</p> : <LoginPage loginCall={POSTToAPI} redirect={setRedirect} loginStatus={setLoggedIn} />}
          </Route>
          <Route path="/signup">
            <h1>Sign up</h1>
            {loggedIn ? <p>You are already logged in.</p> : <SignUp signupCall={POSTToAPI} redirect={setRedirect} loginStatus={setLoggedIn} />}
          </Route>
          <Route path="/user">
            <h1>User Pages</h1>
            {loggedIn ? <SavedPageView pageCall={POSTToAPI} /> : <p>Not logged in</p>}
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
    </div>
  );
}

export default App;
