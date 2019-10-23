const SET_LOADING = 'SET_LOADING'
const SET_DONE_LOADING = 'SET_DONE_LOADING'

const initialState = false

export const setLoading = () => ({
  type: SET_LOADING,
})

export const setDoneLoading = () => ({
  type: SET_DONE_LOADING,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return true
    case SET_DONE_LOADING:
      return false
    default:
      return state
  }
}
