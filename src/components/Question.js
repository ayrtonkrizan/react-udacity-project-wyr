import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers'

class Question extends Component {    
    render() {
        const {questions, users, id}  = this.props;
        const question = questions[id];
        const author = users[question.author] ||{name:'', avatarURL:''}
        console.log(author)
        return (
            <div className="card col-md-3">
                <div className="card-header">
                    <img className="avatar" src={author.avatarURL} alt={`${author.name} avatar`}/>
                    <h6 className="card-subtitle">{author.name}</h6>
                    <span className="text-muted">{formatDate(question.timestamp)}</span>
                </div>
                <div className="card-body">
                    <h3 className="card-text text-center">Would You Rather?</h3>
                    <div className="row">
                        <button type="button" class="btn btn-outline-success btn-lg btn-block question-option">A. {question.optionOne.text}</button>
                        <button type="button" class="btn btn-outline-success btn-lg btn-block question-option">B. {question.optionTwo.text}</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }, { id }) {
    return {
        users,
        questions,
        id
    }
}

export default connect(mapStateToProps)(Question);