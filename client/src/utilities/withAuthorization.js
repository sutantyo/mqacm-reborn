import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from 'utilities/AuthUserContext';
import * as firebase from 'firebase';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push('/');
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(WithAuthorization);
}

export default withAuthorization;
