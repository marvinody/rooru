import history from '../history'
import { resetPage, RESET_PAGE } from './page'
import { getPics } from './pics'
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

const changeTags = tags => ({
  type: SET_TAGS,
  tags,
})


export const setTags = (tags) => dispatch => {
  dispatch(resetPage())
  dispatch(changeTags(tags))
  dispatch(getPics())
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PAGE:
      return []
    case SET_TAGS:
      return action.tags
    default:
      return state
  }
}
