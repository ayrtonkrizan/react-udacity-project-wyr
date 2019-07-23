import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import questions from './questions'
import authedUser from './authedUser'

export default combineReducers({
  questions,
  authedUser,
  loadingBar: loadingBarReducer
})
