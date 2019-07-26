import React, { Component } from 'react';
import { connect } from 'react-redux';

const LeaderBoardRow = (props) => {
    const { user, position } = props;
    return (
        <div key={position} className="row">
            <div className="col col-md-1">{position}</div>
            <div className="col col-md-5"><img className="avatar" src={user.avatarURL} alt={`${user.name} avatar`} /> {user.name}</div>
            <div className="col col-md-2 text-center">{user.questionsQty}</div>
            <div className="col col-md-2 text-center">{user.answersQty}</div>
            <div className="col col-md-2 text-center">{user.totalQty}</div>
        </div>
    )
}

const LeaderBoardHeader = (props) => {
    return(
        <div className="row border border-bottom-1">
            <div className="col col-md-1 lb-header">#</div>
            <div className="col col-md-5 lb-header">User</div>
            <div className="col col-md-2 lb-header text-center">Asks</div>
            <div className="col col-md-2 lb-header text-center">Answers</div>
            <div className="col col-md-2 lb-header text-center">Total</div>
        </div>
    )
}
class Leaderboard extends Component {
    render() {
        const { users, authedUser } = this.props;
        const loggedUser = users.find(u => u.id === authedUser);
        const position = users.indexOf(loggedUser) + 1;
        console.log(this.props)
        return (
            <div className="card col-md-12">
                <div className="card-header">
                    <h1 className="card-subtitle text-center">Leaderboard</h1>
                </div>
                <div className="card-body">
                    <h4>Hey {loggedUser.name} you are in position {position}. Check your resume!</h4>
                    <LeaderBoardHeader />
                    <LeaderBoardRow position={position} user={loggedUser} />
                    <span className="text-muted">Let's check full classification table</span>
                    
                    <LeaderBoardHeader />
                    {users.map((u, index) => (

                        <LeaderBoardRow key={index} user={u} position={index + 1} />
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users: Object.keys(users)
            .map(u => ({
                ...users[u],
                answersQty: Object.keys(users[u].answers).length,
                questionsQty: users[u].questions.length,
                totalQty: Object.keys(users[u].answers).length + users[u].questions.length
            })).sort((a, b) => b.totalQty - a.totalQty),
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard);