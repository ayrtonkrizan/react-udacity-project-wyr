import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { handleInitialData } from './shared'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function handleSaveQuestionAnswer(answerObj) {
  return dispatch => {
    dispatch(showLoading())

    return saveQuestionAnswer({
      ...answerObj
    })
      .then(() => dispatch(handleInitialData(answerObj.authedUser)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleSaveQuestion(info) {
  return dispatch => {
    dispatch(showLoading())

    return saveQuestion({
      ...info,
      author: info.authedUser
    })
      .then(res => dispatch(handleInitialData(res.author)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
