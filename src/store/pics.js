
import axios from 'axios'
import qs from 'qs'
import { setHasNoMorePics } from './hasPics'
import { setDoneLoading, setLoading } from './loadingPics'
import { incPage, RESET_PAGE } from './page'
const LOAD_PICS = 'LOAD_PICS'

// const fakeDataGen = () => {
//   let id = 0
//   return (n) => {
//     return Array(n).fill(0)
//       .map(i => ({
//         id: id++,
//         is_banned: false,
//         preview_file_url: "/kagami.jpg",
//         file_url: "/kagami.jpg",
//         file_ext: 'jpg'
//       }))
//   }
// }
// const generator = fakeDataGen()

const BASE_DANBOORU_URL = 'https://danbooru.donmai.us'
const DANBOORU_POSTS_URL = [BASE_DANBOORU_URL, 'posts.json'].join('/')

const initialState = []

export const getPics = () => async (dispatch, getState) => {
  const { loadingPics, hasPics } = getState()

  if (loadingPics) {
    return
  }

  if (!hasPics) {
    return
  }

  dispatch(setLoading())
  dispatch(incPage())
  const { page, tags } = getState()

  // if (window.location.hostname === 'localhost') {
  //   dispatch({
  //     type: LOAD_PICS,
  //     data: generator(20),
  //   })
  //   dispatch(setDoneLoading())
  //   return
  // }
  const formedTags = tags.map(tag => tag.replace(' ', '_'))
  const { data } = await axios.get(DANBOORU_POSTS_URL, {
    params: {
      page,
      tags: formedTags.join('+'),
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { encode: false })
    },
  })

  const viewable_pics = data
    .filter(pic => !pic.is_banned) // banned will never show up
    .filter(pic => pic.file_url) // and this lets us display to user
  // an empty file_url can be overcome later by checking source but not for right now
  // would need a backend and I would like to keep this client only for the time being

  if (viewable_pics.length === 0) {
    dispatch(setHasNoMorePics())
    return
  }

  dispatch({
    type: LOAD_PICS,
    data: viewable_pics,
  })
  dispatch(setDoneLoading())
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
