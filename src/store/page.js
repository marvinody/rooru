import history from '../history'
const INCREMENT_PAGE = 'INCREMENT_PAGE'
const DECREMENT_PAGE = 'DECREMENT_PAGE'
export const RESET_PAGE = 'RESET_PAGE'

// take a look at the url and parse any existing page out for initial state
const initialState = (function () {
  if (!history.location.search) {
    return 0
  }
  const qs = new URLSearchParams(history.location.search)
  if (!qs.has('page')) {
    return 0
  }
  const page = parseInt(qs.get('page'), 10)
  // -1 because first page load increments before fetch
  return isNaN(page) ? 0 : page - 1

})()

export const incPage = () => ({
  type: INCREMENT_PAGE,
})
export const decPage = () => ({
  type: DECREMENT_PAGE,
})
export const resetPage = () => ({
  type: RESET_PAGE,
})


const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_PAGE:
      return state + 1
    case DECREMENT_PAGE:
      return state - 1
    case RESET_PAGE:
      return 0
    default:
      return state
  }
}
export default subReducer