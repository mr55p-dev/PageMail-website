import './App.css';
import { useState, useEffect } from 'react';
import { Navigation } from './components/navigation.js';
import { Hero, HeroNew } from './components/hero.js';
import { SignUp } from './components/signup-modal';
import { propTypes } from 'react-bootstrap/esm/Image';

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(null);
  const API_ROOT = process.env.REACT_APP_API_ROOT
  console.log(process.env.NODE_ENV)

  // useEffect(() => {
  //   console.log(prefillEmail)
  // }, [prefillEmail])

  async function POSTApi(body) {
    console.log("Posting.")
    const response = fetch(
      // Replace url with variable from environment.
      API_ROOT + "/user/register", {
        method: "POST",
        redirect: "follow",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      }
    )
    .then(response => {
      response.json();
      setShowSignupModal(false);
      alert("Success!")
    })
    .catch(error => console.log(error))
    console.log(response)
  }

  return (
    <div className="App">
      <Navigation />
      {/* <Hero handleShow={() => {setShowSignupModal(true)}} /> */}
      <HeroNew handleShow={() => {setShowSignupModal(true)}}
        emailPrefill={setPrefillEmail} />
      <SignUp show={showSignupModal}
        handleHide={() => {setShowSignupModal(false)}}
        emailPrefill={prefillEmail}
        signupCall={POSTApi} />
    </div>
  );
}

export default App;
