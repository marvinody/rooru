
import axios from 'axios'
import { RESET_PAGE } from './page'
const LOAD_PICS = 'LOAD_PICS'

const BASE_DANBOORU_URL = 'https://danbooru.donmai.us'
const DANBOORU_POSTS_URL = [BASE_DANBOORU_URL, 'posts.json'].join('/')

const initialState = []

export const getPics = () => async (dispatch, getState) => {
  const { page, tags } = getState()

  const { data } = await axios.get(DANBOORU_POSTS_URL, {
    params: {
      page,
      tags: tags.join('+'),
    },
  })

  dispatch({
    type: LOAD_PICS,
    data: data
      .filter(pic => !pic.is_banned) // banned will never show up
      .filter(pic => pic.file_url || pic.source), // and these let us display to user
  })
}



export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PAGE:
      return []
    case LOAD_PICS:
      return state.concat(...action.data)
    default:
      return state
  }
}
