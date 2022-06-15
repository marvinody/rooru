
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

const initialState = false

export const showModal = () => ({
  type: SHOW_MODAL,
})

export const hideModal = () => ({
  type: HIDE_MODAL,
})

const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_MODAL:
      return false
    case SHOW_MODAL:
      return true
    default:
      return state
  }
}
export default subReducer