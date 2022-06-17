const TOGGLE_ABOUT_VIS = 'TOGGLE_ABOUT_VIS'


const initialState = {
  show: false,
}

export const toggleAboutPage = () => {
  return {
    type: TOGGLE_ABOUT_VIS,
  }
}

const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ABOUT_VIS:
      return {
        ...state,
        show: !state.show,
      }
    default:
      return state
  }
}
export default subReducer