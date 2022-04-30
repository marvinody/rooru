import { getPics } from './pics'
import { resetPage } from './page'

import stateSaver from './stateSaver'
const TOGGLE_SAFE = 'TOGGLE_SAFE';
const TOGGLE_QUESTIONABLE = 'TOGGLE_QUESTIONABLE';
const TOGGLE_EXPLICIT = 'TOGGLE_EXPLICIT';




const initialState = stateSaver({
  mapStateToSave: state => state.ratingFilters,
  key: 'ratingFilters',
  initialState: {
    safe: true,
    questionable: false,
    explicit: false,
  },
  actionsToSaveOn: [TOGGLE_SAFE, TOGGLE_QUESTIONABLE, TOGGLE_EXPLICIT]
})

const _toggleSafe = () => ({
  type: TOGGLE_SAFE,
})

const _toggleQuestionable = () => ({
  type: TOGGLE_QUESTIONABLE,
})

const _toggleExplicit = () => ({
  type: TOGGLE_EXPLICIT,
})

export const toggleSafe = () => (dispatch) => {
  dispatch(resetPage())
  dispatch(_toggleSafe())
  dispatch(getPics())
}

export const toggleQuestionable = () => (dispatch) => {
  dispatch(resetPage())
  dispatch(_toggleQuestionable())
  dispatch(getPics())
}

export const toggleExplicit = () => (dispatch) => {
  dispatch(resetPage())
  dispatch(_toggleExplicit())
  dispatch(getPics())
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SAFE:
      return {
        ...state,
        safe: !state.safe
      }
    case TOGGLE_QUESTIONABLE:
      return {
        ...state,
        questionable: !state.questionable
      }
    case TOGGLE_EXPLICIT:
      return {
        ...state,
        explicit: !state.explicit
      }
    default:
      return state
  }
}
