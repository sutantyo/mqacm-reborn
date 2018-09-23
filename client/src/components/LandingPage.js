import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignInScreen from 'utilities/firebase';


class LandingPage extends Component {
  render() {
    return(
      <div>
        <ul>
          <li>
            <Link to="/getting-started">Getting Started</Link>
          </li>
          <li>
            <Link to="/problems">Problems</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
        </ul>
        <SignInScreen />
      </div>
    );
  }
}
export default LandingPage;
