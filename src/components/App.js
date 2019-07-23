import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading'
import { handleInitialData } from '../actions/shared';


import Dashboard from './Dashboard';

class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }
  render(){
    return(
      <Fragment>
        <LoadingBar />
        {this.props.loading ? null : (
          <div>
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
