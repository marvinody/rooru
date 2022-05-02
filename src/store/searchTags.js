import axios from 'axios'
import _ from 'lodash'


const SET_SEARCH_TAGS = 'SET_SEARCH_TAGS'
const RESET_SEARCH_TAGS = 'RESET_SEARCH_TAGS'

const initialState = []

const setSearchTags = tags => ({
  type: SET_SEARCH_TAGS,
  tags,
})

export const resetSearchTags = () => ({
  type: RESET_SEARCH_TAGS,
})



export const searchTags = _.debounce((searchQuery) => async dispatch => {
  try {
    if (searchQuery.length === 0) {
      return
    }

    const { data: tags } = await axios.get(`https://danbooru.donmai.us/autocomplete.json`, {
      params: {
        'search[query]': `*${searchQuery}*`,
        'search[type]': "tag_query",
        limit: 10,
      }
    })
    dispatch(setSearchTags(tags))
  } catch (err) {
    console.error(err)
    dispatch(setSearchTags([]))

  }

}, 125, {
  leading: true,
  trailing: true,
})




export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TAGS:
      return action.tags
    case RESET_SEARCH_TAGS:
      return []
    default:
      return state
  }
}
