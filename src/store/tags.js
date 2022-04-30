import history from '../history'
import { resetPage, RESET_PAGE } from './page'
import { getPics } from './pics'
const SET_TAGS = 'SET_TAGS'


const initialState = (function () {
  if (!history.location.search) {
    return []
  }
  const qs = new URLSearchParams(history.location.search)
  if (!qs.has('tags')) {
    return []
  }
  const tags = qs.get('tags')
  return tags.split('+').filter(t => t.length > 0)

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


export const removeTag = (tag) => (dispatch, getState) => {
  const tags = getState().tags
  const newTags = tags.filter(t => t !== tag)
  dispatch(resetPage())
  dispatch(setTags(newTags))
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
    case SET_TAGS:
      return action.tags
    default:
      return state
  }
}
