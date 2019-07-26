import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Nav extends Component {
    state = {
        collapse: 'collapse'
    }
    toggleMenu = () =>{
        let collapse = this.state.collapse===''? 'collapse': '';
        this.setState({collapse: collapse});
    }
    render() {
        const { user } = this.props
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to='/' className="navbar-brand">Would You Rather?</NavLink>

                <div className={`${this.state.collapse} navbar-collapse`}>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink exact to='/question/add' className="nav-link" activeClassName='active'>New Question</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/leaderboard' className="nav-link" activeClassName='active'>Leaderboard</NavLink>
                        </li>
                    </ul>
                </div>
                {
                    user && (
                    <NavLink to='/logout' className="navbar-text">
                        {user.name} <span className='font-italic small'>sign-out </span><img className="avatar-nav" src={user.avatarURL} alt={`${user.name} avatar`}/> 
                    </NavLink>)
                }
            </nav>
        )
    }
}
function mapStateToProps({users, authedUser}) {
    const user = users[authedUser]
    return {
        user: user
    }
}
export default connect(mapStateToProps)(Nav);