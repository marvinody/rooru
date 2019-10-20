const INCREMENT_PAGE = 'INCREMENT_PAGE'
const DECREMENT_PAGE = 'DECREMENT_PAGE'
export const RESET_PAGE = 'RESET_PAGE'

const initialState = 0

export const incPage = () => ({
  type: INCREMENT_PAGE,
})
export const decPage = () => ({
  type: DECREMENT_PAGE,
})
export const resetPage = () => ({
  type: RESET_PAGE,
})


export default (state = initialState, action) => {
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
