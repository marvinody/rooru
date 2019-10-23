const SELECT_PIC = 'SELECT_PIC'

const initialState = {}

export const selectPic = (pic) => ({
  type: SELECT_PIC,
  pic,
})


export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PIC:
      return action.pic
    default:
      return state
  }
}
