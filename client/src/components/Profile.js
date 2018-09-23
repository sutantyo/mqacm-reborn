import React, { Component } from 'react';
import withAuthorization from 'utilities/withAuthorization';

class Profile extends Component {
  render() {
    return(
      <h2> Profile page </h2>
    );
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Profile);
