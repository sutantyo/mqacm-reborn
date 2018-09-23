import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import WelcomePage from 'components/WelcomePage';

import GettingStarted from 'components/GettingStarted';
import Problems from 'components/Problems';
import Profile from 'components/Profile';
import Leaderboard from 'components/Leaderboard';
import Resources from 'components/Resources';

import TopNavBar from 'components/TopNavBar';

if (module.hot){
  module.hot.accept();
}

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <EmptyLayout exact path="/" component={WelcomePage}/>
            <DefaultLayout path="/getting-started" component={GettingStarted}/>
            <DefaultLayout path="/problems" component={Problems}/>
            <DefaultLayout path="/leaderboard" component={Leaderboard}/>
            <DefaultLayout path="/resources" component={Resources}/>
            <DefaultLayout path="/profile" component={Profile}/>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;

const DefaultLayout = ({component: Component, ...rest}) => {
  return(
    <Route {...rest} render = {matchProps => (
      <div>
        <TopNavBar />
        <Component {...matchProps}/>
      </div>
    )} />
  )
}

const EmptyLayout = ({component: Component, ...rest}) => {
  return(
    <Route {...rest} render = {matchProps => (
      <div>
        <Component {...matchProps}/>
      </div>
    )} />
  )
}
