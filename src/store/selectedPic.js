const SELECT_PIC = 'SELECT_PIC'

const initialState = {}

export const selectPic = (pic, idx) => ({
  type: SELECT_PIC,
  pic,
  idx,
})


export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PIC:
      return { ...action.pic, idx: action.idx }
    default:
      return state
  }
}
