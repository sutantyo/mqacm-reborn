import React, { Component } from 'react';
import withAuthorization from 'utilities/withAuthorization';

class Problems extends Component {
  render() {
    return(
      <h2> Problems page </h2>
    );
  }
}
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Problems);
