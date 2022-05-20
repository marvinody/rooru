import history from '../history'
import { resetPage } from './page'
import { getPics } from './pics'

const SET_TAGS = 'SET_TAGS'

// const specialEncode = s => s.replace(/\+/, "%2B");
const specialDecode = s => s.replace(/%2B/, "+");

const initialState = (function () {
  if (!history.location.search) {
    return []
  }
  const qs = new URLSearchParams(history.location.search)
  if (!qs.has('tags')) {
    return []
  }
  const tags = qs.get('tags')
  console.log({tags})
  const semiFormattedTags = 
  tags
  .split(',')
  .filter(t => t.length > 0)
  .map(s => s.replace(/ /, '+'))
  .map(s => {
    const parsed = specialDecode(s)
    const isPositive = parsed[0] === '+'
    return {
      value: parsed.slice(1), 
      positive: isPositive,
    }
  })
  console.log({semiFormattedTags})

    return semiFormattedTags;

})()

const updateURL = (tags) => {
  const tagStr = tags.map(t => {
      if(t.positive) {
        return `+${t.value}`;
      }
      return `-${t.value}`;
    }).join(",")
  history.push(`${window.location.pathname}?tags=${tagStr}`);
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

export const toggleTag = (tag) => (dispatch, getState) => {
  const tags = getState().tags
  const newTags = tags.map(t => {
    if(t !== tag) { return t }
    return {
      ...t,
      positive: !t.positive
    }
  })
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
