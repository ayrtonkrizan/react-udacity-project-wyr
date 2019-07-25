import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

const UNANSWERED = 'Unanswered';
const ANSWERED = 'Answered';

class Dashboard extends Component {

    state = {
        category: UNANSWERED,
        categoryClass: ''
    }

    getCategoryClass(){
        return this.state.category === ANSWERED? 'btn btn-success' : 'btn btn-outline-success'
    }
    handleToggleCategory = e =>{

        this.setState({
            category: this.state.category === UNANSWERED? ANSWERED : UNANSWERED
        })
    }
    render(){
        const { category } = this.state
        const { answeredQuestionIds, unansweredQuestionIds } = this.props;
        let questionsToShow = {};
        
        if(category ===UNANSWERED)
            questionsToShow = unansweredQuestionIds
        else
            questionsToShow = answeredQuestionIds

        console.log(questionsToShow)
        return(
            <div className='container center'>
                <h2 className="text-center dashboard-title">I Wanna See <button onClick={this.handleToggleCategory} className={this.getCategoryClass()}>{category}</button> questions!</h2>
                <div className="d-flex justify-content-around flex-wrap">
                    {questionsToShow
                        .map(key => {
                            return(
                                <Question key={key} id ={key}/>
                            )}
                        )
                    }
                </div>

            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }) {
    return {
        users,
        questions,
        authedUser,
        answeredQuestionIds: Object.keys(questions)
								.filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) > -1) || (questions[question].optionTwo.votes.indexOf(authedUser) > -1))
								.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
	    unansweredQuestionIds: Object.keys(questions)
								.filter((question) => (questions[question].optionOne.votes.indexOf(authedUser) === -1) && (questions[question].optionTwo.votes.indexOf(authedUser) === -1))
								.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
  }
export default connect(mapStateToProps)(Dashboard);