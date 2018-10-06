import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';


class TopNavBar extends Component {
  render() {
    return(
      <div>
          <div>
            <Link to="/problems">Problems</Link>
          </div>
          <div>
            <Link to="/leaderboard">Leaderboard</Link>
          </div>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div>
            <Link to="/resources">Resources</Link>
          </div>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
          </div>
      </div>
    );
  }
}
export default TopNavBar;
