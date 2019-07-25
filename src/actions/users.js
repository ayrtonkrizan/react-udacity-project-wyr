export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers(users) {
  console.log('users_actions', users)
  return {
    type: RECEIVE_USERS,
    users
  }
}
