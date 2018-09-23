import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class TopNavBar extends Component {
  render() {
    return(
      <div>
          <span>
            <Link to="/problems">Problems</Link>
          </span>
          <span>
            <Link to="/leaderboard">Leaderboard</Link>
          </span>
          <span>
            <Link to="/profile">Profile</Link>
          </span>
          <span>
            <Link to="/resources">Resources</Link>
          </span>
          <span>
            <Link to="/">Home</Link>
          </span>

      </div>
    );
  }
}
export default TopNavBar;
