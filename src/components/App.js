import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading'
import { handleInitialData } from '../actions/shared';


import Dashboard from './Dashboard';
import Login from './Login';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Fragment>
        <Nav />
        <LoadingBar />
        {this.props.loading ? null : (
          <div className='container'>
            <Dashboard />
          </div>
        )}
      </Fragment>
    )
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar > 0
  }
}

export default connect(mapStateToProps)(App);
