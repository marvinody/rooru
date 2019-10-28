import { HIDE_MODAL, SHOW_MODAL } from './showModal'

const SET_LOADING = 'SET_LOADING_PIC'
const SET_DONE_LOADING = 'SET_DONE_LOADING_PIC'

const initialState = false

export const setLoading = () => ({
  type: SET_LOADING,
})

export const setDoneLoading = () => ({
  type: SET_DONE_LOADING,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
    case SET_LOADING:
      return true
    case HIDE_MODAL:
    case SET_DONE_LOADING:
      return false
    default:
      return state
  }
}
