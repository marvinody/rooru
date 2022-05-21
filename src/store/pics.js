
import { searchPics } from '../util/api/danbooru';
import { setHasNoMorePics } from './hasPics'
import { setDoneLoading, setLoading } from './loadingPics'
import { incPage, RESET_PAGE } from './page'
const LOAD_PICS = 'LOAD_PICS'
const specialEncode = s => s.replace(/\+/, "%2B");


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

const getRatingTag = (ratings) => {
  const ratingBitmask =
    (ratings.safe) |
    (ratings.questionable << 1) |
    (ratings.explicit << 2)

  switch (ratingBitmask) {
    case 0b001:
      return 'rating:safe';
    case 0b010:
      return 'rating:questionable';
    case 0b100:
      return 'rating:explicit';
    case 0b110:
      return '-rating:safe';
    case 0b101:
      return '-rating:questionable';
    case 0b011:
      return '-rating:explicit';
    default:
      return null;
  }
}



const initialState = [];

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
  const { page, tags, ratingFilters } = getState()

  // if (window.location.hostname === 'localhost') {
  //   dispatch({
  //     type: LOAD_PICS,
  //     data: generator(20),
  //   })
  //   dispatch(setDoneLoading())
  //   return
  // }
  const formedTags = [...tags]
    .sort((a, b) => a.postCount - b.postCount)
    .map(tag => {
      const fullValue = `${tag.positive ? '' : '-'}${tag.value}`

      return specialEncode(fullValue);
    })

  const ratingTag = getRatingTag(ratingFilters);

  if (ratingTag) {
    formedTags.push(ratingTag)
  }

  const { data } = await searchPics({
    page,
    tags: formedTags.join('+')
  });

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
