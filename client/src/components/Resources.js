import React, { Component } from 'react';
import withAuthorization from 'utilities/withAuthorization';

class Resources extends Component {
  render() {
    return(
      <h2> Resources page </h2>
    );
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Resources);
