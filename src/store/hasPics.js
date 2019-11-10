const SET_HAS_MORE_PICS = 'SET_HAS_MORE_PICS'
const SET_HAS_NO_MORE_PICS = 'SET_HAS_NO_MORE_PICS'

const initialState = true

export const setHasMorePics = () => ({
  type: SET_HAS_MORE_PICS,
})

export const setHasNoMorePics = () => ({
  type: SET_HAS_NO_MORE_PICS,
})


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HAS_MORE_PICS:
      return true
    case SET_HAS_NO_MORE_PICS:
      return false
    default:
      return state
  }
}
