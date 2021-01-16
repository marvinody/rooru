import history from '../history'
import { resetPage, RESET_PAGE } from './page'
import { getPics } from './pics'
const SET_TAGS = 'SET_TAGS'
const REMOVE_TAG = 'REMOVE_TAG'

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
  const tags = qs.get('tags')
  return tags.split('+')

})()

const updateURL = (tags) => {
  const qs = new URLSearchParams(history.location.search)
  qs.set("tags", tags.join("+"))
  history.push(`${window.location.pathname}?${qs.toString()}`);
}

const changeTags = tags => ({
  type: SET_TAGS,
  tags,
})

const remTag = tag => ({
  type: REMOVE_TAG,
  tag,
})

export const removeTag = (tag) => dispatch => {
  dispatch(resetPage())
  dispatch(remTag(tag))
  dispatch(getPics())
}

export const setTags = (tags) => dispatch => {
  dispatch(resetPage())
  dispatch(changeTags(tags))
  updateURL(tags)
  dispatch(getPics())
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PAGE:
      return []
    case SET_TAGS:
      return action.tags
    case REMOVE_TAG:
      return state.filter(t => action.tag !== t)
    default:
      return state
  }
}
