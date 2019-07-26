import { _getQuestions, _getUsers } from './_DATA.js'
import { _saveQuestionAnswer, _saveQuestion} from '../utils/_DATA'

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  )
}

export function saveQuestion(...obj){
  return _saveQuestion(...obj)
}

export function saveQuestionAnswer(...obj){
  return _saveQuestionAnswer(...obj)
}
