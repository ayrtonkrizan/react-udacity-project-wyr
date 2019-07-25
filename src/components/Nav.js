import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
    render() {
        const { user } = this.props
        console.log('aqui nessa porra', user)
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to='/' className="navbar-brand">Would You Rather?</NavLink>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink exact to='/' className="nav-link" activeClassName='active'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/leaderboar' className="nav-link" activeClassName='active'>Leaderboard</NavLink>
                        </li>
                    </ul>
                </div>
                {
                    user && (
                    <NavLink to="/login" className="navbar-text">
                        {user.name} <span className='font-italic small'>sign-out </span><img className="avatar-nav" src={user.avatarURL} alt={`${user.name} avatar`}/> 
                    </NavLink>)
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