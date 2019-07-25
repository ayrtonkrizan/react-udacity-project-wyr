import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        const { user } = this.props
        console.log('aqui nessa porra', user)
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Would You Rather?</a>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Leaderboard</a>
                        </li>
                    </ul>
                </div>
                {
                    user && (
                    <div class="navbar-text">
                        {user.name} <span className='font-italic small'>sign-out</span><img className="avatar-nav" src={user.avatarURL} alt={`${user.name} avatar`}/> 
                    </div>)
                }
            </nav>
        )
    }
}
function mapStateToProps({users, authedUser}) {
    const user = users['johndoe']
    console.log(user)
    return {
        user: user
    }
}
export default connect(mapStateToProps)(Nav);