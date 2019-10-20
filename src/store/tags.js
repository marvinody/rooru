import history from '../history'
import { RESET_PAGE } from './page'
const SET_TAGS = 'SET_TAGS'

// take a look at the url and parse any existing tags out for initial state
// this should be syncronized later
const initialState = (function () {
  if (!history.location.search) {
    return []
  }
  const qs = new URLSearchParams(history.location.search)
  if (!qs.has('tags')) {
    return []
  }
  return qs.get('tags').split('+')

})()

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PAGE:
      return []
    default:
      return state
  }
}
