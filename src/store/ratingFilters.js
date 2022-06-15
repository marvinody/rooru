import { getPics } from './pics'
import { resetPage } from './page'

import stateSaver from './stateSaver'
const TOGGLE_GENERAL = 'TOGGLE_GENERAL'
const TOGGLE_SENSITIVE = 'TOGGLE_SENSITIVE'
const TOGGLE_QUESTIONABLE = 'TOGGLE_QUESTIONABLE'
const TOGGLE_EXPLICIT = 'TOGGLE_EXPLICIT'

const initialState = stateSaver({
  mapStateToSave: state => state.ratingFilters,
  key: 'ratingFilters',
  initialState: {
    general: true,
    sensitive: false,
    questionable: false,
    explicit: false,
  },
  actionsToSaveOn: [TOGGLE_GENERAL, TOGGLE_SENSITIVE, TOGGLE_QUESTIONABLE, TOGGLE_EXPLICIT],
})

const toggleHelper = (constant) => () => (dispatch) => {
  dispatch(resetPage())
  dispatch({
    type: constant,
  })
  dispatch(getPics())
}

export const toggleGeneral = toggleHelper(TOGGLE_GENERAL)
export const toggleSensitive = toggleHelper(TOGGLE_SENSITIVE)
export const toggleQuestionable = toggleHelper(TOGGLE_QUESTIONABLE)
export const toggleExplicit = toggleHelper(TOGGLE_EXPLICIT)


const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_GENERAL:
      return {
        ...state,
        general: !state.general,
      }        
    case TOGGLE_SENSITIVE:
      return {
        ...state,
        sensitive: !state.sensitive,
      }        
    case TOGGLE_QUESTIONABLE:
      return {
        ...state,
        questionable: !state.questionable,
      }        
    case TOGGLE_EXPLICIT:
      return {
        ...state,
        explicit: !state.explicit,
      }        
    default:
      return state
  }
}
export default subReducer
