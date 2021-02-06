import './App.css';
import { useState } from 'react';
import { Navigation } from './components/navigation.js';
import { Hero } from './components/hero.js';
import { SignUp } from './components/signup-modal';

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(null);
  const API_ROOT = process.env.REACT_APP_API_ROOT

  async function POSTApi(body) {
    const response = fetch(
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
      <Hero handleShow={() => {setShowSignupModal(true)}}
        emailPrefill={setPrefillEmail} />
      <SignUp show={showSignupModal}
        handleHide={() => {setShowSignupModal(false)}}
        emailPrefill={prefillEmail}
        signupCall={POSTApi} />
    </div>
  );
}

export default App;
