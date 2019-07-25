import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    render() {
        const { users } = this.props;
        console.log(this.props)
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
                                    <button type="button" class="btn btn-outline-success btn-lg btn-block">
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

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login);