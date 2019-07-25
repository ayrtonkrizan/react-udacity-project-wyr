import React, { Component } from 'react';
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
      <div className ='container'>
        <LoadingBar />
        {this.props.loading ? null : (
          <div>
            <Dashboard />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar > 0
  }
}

export default connect(mapStateToProps)(App);
