import React, { Component } from 'react';
import withAuthorization from 'utilities/withAuthorization';

class Leaderboard extends Component {
  render() {
    return(
      <h2> Leaderboard page </h2>
    );
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Leaderboard);
