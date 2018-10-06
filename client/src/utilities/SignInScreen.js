import React, { Component } from 'react';
import { firebase } from 'utilities/Firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class SignInScreen extends Component {
  state = {
    isSignedIn: false,
  }

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          if (user){
            // if user signs in with non mq.edu.au email address, log the user out
            if (!user.email.endsWith('@mq.edu.au') && !user.email.endsWith('@students.mq.edu.au') && !whitelist.includes(user.email)){
              firebase.auth().signOut();
            }
          }
          this.setState({isSignedIn: !!user})
        }
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in using your OneID:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}. You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}
export default SignInScreen;

const whitelist = [
  'daniel.sutantyo@gmail.com',
]
