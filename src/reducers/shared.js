import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData } from '../utils/api'
import { receiveQuestions } from '../actions/questions'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from './authedUser'

export function handleInitialData(userId) {
  return dispatch => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
      dispatch(setAuthedUser(userId ? userId : null))
      dispatch(receiveQuestions(questions))
      dispatch(receiveUsers(users))
      dispatch(hideLoading())
    })
  }
}
