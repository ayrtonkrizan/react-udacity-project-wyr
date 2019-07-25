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
        const {questions} = this.props;
        return(
            <div className='container center'>
                <h2 className="text-center dashboard-title">I Wanna See <button onClick={this.handleToggleCategory} className={this.getCategoryClass()}>{category}</button> questions!</h2>
                <div className="d-flex justify-content-around flex-wrap">
                    {Object.keys(questions)
                        .map(key => {
                            console.log(questions[key])
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

function mapStateToProps({ users, questions }) {
    return {
      users,
      questions
    }
  }
export default connect(mapStateToProps)(Dashboard);