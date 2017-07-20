let initialState = {
  currentUser: {name: "Nobody"}
}

//action types
const GET_USER = "GET_USER"

//reducer
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER + "_PENDING":
      console.log('Loading user...')
      return state
    case GET_USER + "_FULFILLED":
      return Object.assign({}, state, {currentUser: action.payload})
    case GET_USER:
      console.log("You should not be seeing this...")
      return state
    default:
      return state
  }
}

//action creators
export function getUser(promise) {
  return {
    type: GET_USER,
    payload: promise
  }
}