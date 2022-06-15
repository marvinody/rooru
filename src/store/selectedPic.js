import { setLoadingPic } from './loadingPic'
import { getPics } from "./pics"
const SELECT_PIC = 'SELECT_PIC'

const initialState = {}

export const selectPic = (pic, idx) => dispatch => {
  dispatch(setLoadingPic())
  dispatch({
    type: SELECT_PIC,
    pic,
    idx,
  })
}
export const nextPic = () => (dispatch, getState) => {
  const { selectedPic, pics } = getState()
  const { idx } = selectedPic
  const newIdx = idx + 1

  if (newIdx >= pics.length) {
    return
  }

  // fetch more pics if we're near the end
  if (newIdx > pics.length - 10) {
    dispatch(getPics())
  }

  dispatch(selectPic(pics[newIdx], newIdx))

}

export const prevPic = () => (dispatch, getState) => {
  const { selectedPic, pics } = getState()
  const { idx } = selectedPic
  const newIdx = idx - 1
  // fetch more pics if we're near the end
  if (newIdx < 0) {
    return
  }
  dispatch(selectPic(pics[newIdx], newIdx))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PIC:
      return { ...action.pic, idx: action.idx }
    default:
      return state
  }
}
