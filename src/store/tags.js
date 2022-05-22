import history from '../history'
import { tagSearchExact } from '../util/api/danbooru';
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

  const semiFormattedTags =
    tags
      .split(',')
      .filter(t => t.length > 0)
      .map(s => s.replace(/ /g, '+'))
      .map(s => {
        const parsed = specialDecode(s)
        const isPositive = parsed[0] === '+'
        return {
          value: parsed.slice(1),
          positive: isPositive,
        }
      })
  return semiFormattedTags;

})();

const updateURL = (tags) => {
  const tagStr = tags.map(t => {
    if (t.positive) {
      return `+${t.value}`;
    }
    return `-${t.value}`;
  }).join(",")
  history.push(`${window.location.pathname}?tags=${tagStr}`);
}

export const changeTags = tags => ({
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
    if (t !== tag) { return t }
    return {
      ...t,
      positive: !t.positive
    }
  })
  dispatch(resetPage())
  dispatch(setTags(newTags))
  dispatch(getPics())
}

export const loadTagMetadata = () => async (dispatch, getState) => {
  const tags = getState().tags
  const tagsWithoutMetadata = tags.filter(t => t.postCount === undefined)
  const tagsWithMetadata = tags.filter(t => t.postCount !== undefined)

  if(tagsWithoutMetadata.length > 0) {
    const lookups = await Promise.all(tagsWithoutMetadata.map(async (tag) => {
      const { data } = await tagSearchExact({
        searchQuery: tag.value
      });

      const matchingTag = data.find(t => t.value === tag.value)
      if(!matchingTag) {
        return null;
      }

      return  {
        value: matchingTag.value,
        positive: tag.positive,
        postCount: matchingTag.post_count,
      }
    }));

    const newTags = [
      ...tagsWithMetadata,
      ...lookups.filter(t => Boolean(t)),
    ]

    dispatch(setTags(newTags))
  }

  // all data loaded, nothing to do
  return;
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
