import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers'

const QuestionVoted = (props) => {
    const{option, users} = props
    return(
        <div className="card col-md-3">
            <div className="card-header">
                <h6 className="card-subtitle text-center">{option.text}</h6>
            </div>
            <div className="card-body d-flex justify-content-left flex-wrap">
                {option.votes.map(u => (
                        <div className="inline-block" key={u}>
                            <img className="avatar-login" src={users[u].avatarURL} alt={`${users[u].name} avatar`}/>
                            <span>{users[u].name}</span>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export const QuestionDetail = (props) => {
    const{pathname, idLink} = props.location;
    const id = idLink || pathname.substr(pathname.indexOf('/', 2)+1)
    return (
        <Fragment>
            <h1 className="text-center">Question Detail</h1>
            <div className='d-flex justify-content-around flex-wrap'>
                {console.log()}
                <ConnectedQuestion id={id} withDetails={true}/>
            </div>
        </Fragment>
    )
}


export const QuestionList = (props)=>{
    return(
        <div className="d-flex justify-content-around flex-wrap">
            {props.questionsIds
                .map(key => {
                    return(
                        <ConnectedQuestion key={key} id ={key}/>
                    )}
                )
            }
        </div>
    )
}

const Option = props =>{
    const {authedUser, votes, option, text} = props; 
    let classBtn = "btn btn-outline-success btn-lg btn-block question-option";
    let textBtn = text;
    if(votes.find(v=> v === authedUser)){
        textBtn = `Votes - ${option.length} - ${option.length/votes.length*100}%`;
        if(option.find(v=> v=== authedUser))
            classBtn = "btn btn-success btn-lg btn-block question-option disabled"
        else
            classBtn = "btn btn-outline-success btn-lg btn-block question-option disabled"
    }

    return (
        <button type="button" className={classBtn}>{textBtn}</button>
    )
}

const QuestionCard = props =>{
    const {question, author, id, authedUser} = props;
    const VoteList = question.optionOne.votes.concat(question.optionTwo.votes);
    return (
        <div className="card col-md-3">
            <NavLink 
                to={{
                    pathname: `/questions/${id}`,
                    idLink:id
                    }} 
                className="card-header"
            >
                <img className="avatar" src={author.avatarURL} alt={`${author.name} avatar`}/>
                <h6 className="card-subtitle">{author.name}</h6>
                <span className="text-muted">{formatDate(question.timestamp)}</span>
            </NavLink>
            <div className="card-body">
                <h3 className="card-text text-center">Would You Rather?</h3>
                <div className="row">
                    <Option text={`A. ${question.optionOne.text}`} votes={VoteList} authedUser={authedUser} option={question.optionOne.votes}/>
                    <Option text={`B. ${question.optionTwo.text}`} votes={VoteList} authedUser={authedUser} option={question.optionTwo.votes}/>
                </div>
            </div>
        </div>
    )
}

class Question extends Component {    
    render() {
        const {questions, users, id, withDetails, authedUser}  = this.props;
        const question = questions[id];
        const author = users[question.author] ||{name:'', avatarURL:''}
        return(
            <Fragment>
                <QuestionCard question={question} author={author} id={id} authedUser={authedUser}/>
                {withDetails === true && <QuestionVoted users={users} option={question.optionOne}/>}
                {withDetails === true && <QuestionVoted users={users} option={question.optionTwo}/>}
            </Fragment>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
    return {
        users,
        questions,
        authedUser,
        id
    }
}
const ConnectedQuestion = connect(mapStateToProps)(Question);
// export default ConnectedQuestion;