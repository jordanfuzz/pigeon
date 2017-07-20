import axios from 'axios'
import store from '../store'
import {getUser} from '../ducks/reducer'

export function dispatchGetUser() {
  let promise = axios.get('/auth/me').then(res => console.log(res.data))
  // store.dispatch(getUser(promise))
}