import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';


class Logout extends Component {
    render() {
        const { dispatch } = this.props;
        dispatch(setAuthedUser(null));
        return (
            <Redirect to='/login'/>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Logout);