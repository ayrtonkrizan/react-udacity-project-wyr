import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading'
import { handleInitialData } from '../actions/shared';


import Dashboard from './Dashboard';
import Login from './Login';
import Leaderboard from './Leaderboard';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <LoadingBar />
          {this.props.loading ? null : (
            <div className='container'>
              <Route path='/' exact component={Dashboard} />
              <Route path='/login' component={Login} />
              <Route path='/questions/:id' component={Login} />
              <Route path='/Leaderboard' component={Leaderboard} />
            </div>
          )}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar > 0
  }
}

export default connect(mapStateToProps)(App);
