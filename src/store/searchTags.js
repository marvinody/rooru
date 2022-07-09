import { tagSearchWildcard, tagSearchExact } from '../util/api/danbooru'


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



export const searchTags = (searchQuery) => async (dispatch, getState) => {
  try {
    if (searchQuery.length === 0) {
      return
    }

    const { settings } = getState()

    let search = tagSearchWildcard
    if (settings.exactTextMatch) {
      search = tagSearchExact
    }

    const { data: tags } = await search({ searchQuery })

    dispatch(setSearchTags(tags))
  } catch (err) {
    console.error(err)
    dispatch(setSearchTags([]))
  }
}




const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TAGS:
      return action.tags
    case RESET_SEARCH_TAGS:
      return []
    default:
      return state
  }
}
export default subReducer