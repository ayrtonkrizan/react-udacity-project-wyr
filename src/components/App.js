import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading'
import { handleInitialData } from '../actions/shared';
import { setAuthedUser } from '../actions/authedUser';


import Dashboard from './Dashboard';
import Login from './Login';
import Logout from './Logout';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import {QuestionDetail} from './Question';


const PrivateRoute = ({ component: Component, ...props }) => (
  <Route {...props} render={(x) => {
    return (
    (props.authedUser !== null && props.authedUser !== undefined)
      ? <Component {...props} {...x} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )}} />
)

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  logout= () =>{
    this.props.dispatch(setAuthedUser(null));
  }
  render() {
    return (
      <Router>
        <Fragment>
          {this.props.login !== null && <Nav />}
          <LoadingBar />
          {this.props.loading ? null : (
            <div className='container'>
              <PrivateRoute path='/' exact component={Dashboard} authedUser={this.props.login} />
              <PrivateRoute path='/questions/:id' component={QuestionDetail} authedUser={this.props.login} />
              <PrivateRoute path='/leaderboard' exact component={Leaderboard} authedUser={this.props.login}/>
              <Route path='/login' exact component={Login} />
              <Route path='/logout' exact component={Logout} logout={this.logout}/>
            </div>
          )}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ loadingBar, authedUser }) {
  return {
    loading: loadingBar > 0,
    login: authedUser
  }
}

export default connect(mapStateToProps)(App);
