import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/questions'

class QuestionAdd extends Component {
    constructor(props){
        super(props);

        this.optionA = React.createRef();
        this.optionB = React.createRef();
    }

    state = {
        redirectHome: false
    }
    onSubmit = e =>{
        e.preventDefault();
        const {authedUser, dispatch} = this.props;
        const newQuestion = {
            authedUser,
            optionOneText: this.optionA.current.value,
            optionTwoText: this.optionB.current.value
        }
        
        dispatch(handleSaveQuestion(newQuestion))
            .then(()=>{
                this.setState({
                    redirectHome:true
                })
            });
    }
    render() {
        const { redirectHome } = this.state;
        if(redirectHome)
            return(<Redirect to='/' />)
        return (
            <div className="card col-md-12">
                <div className="card-header">
                    <h1 className="card-subtitle text-center">Would You Rather?</h1>
                </div>
                <form className="card-body d-flex justify-content-left flex-wrap" onSubmit={this.onSubmit}>
                    
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">A</div>
                        </div>
                        <input ref={this.optionA} type="text" className="form-control" name="optionA" placeholder="Type option A"/>
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">B</div>
                        </div>
                        <input ref={this.optionB} type="text" className="form-control" name="optionB" placeholder="Type option B"/>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg btn-block">Add Question</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    return {
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionAdd);