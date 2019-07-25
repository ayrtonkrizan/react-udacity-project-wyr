import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';


class Login extends Component {
    state = {
        redirectToReferrer: false
    }

    handleLogin = e =>{
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(setAuthedUser(e.target.name));
        this.setState({
            redirectToReferrer:true
            }
        )
    }
    render() {
        const { from } = this.props.location.state || { pathname: '/' }
        const { redirectToReferrer } = this.state
        
        if(redirectToReferrer){
            return (<Redirect to={from || { pathname: '/' }} />)
        }

        const { users } = this.props;

        return (
            <div className="login d-flex align-items-center justify-content-center">
                <div className="login-card card col-md-6">
                    <div className="card-header">
                        <h2 className="text-center login-title">Who are you?</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {
                                Object.keys(users).map(key=>(
                                    <button key={key} type="button" name={key} className="btn btn-outline-success btn-lg btn-block" onClick={this.handleLogin}>
                                        <img className="avatar-login" src={users[key].avatarURL} alt={`${users[key].name} avatar`}/> {users[key].name}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Login);