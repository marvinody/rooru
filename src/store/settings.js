import stateSaver from './stateSaver'
const TOGGLE_SETTINGS_VIS = 'TOGGLE_SETTINGS_VIS'
const TOGGLE_SETTINGS_BOOL = 'TOGGLE_SETTINGS_BOOL'


const initialState = stateSaver({
  mapStateToSave: state => ({
    ...state.settings,
    show: false, // show should always be saved as false
  }),
  key: 'settings',
  initialState: {
    show: false,
    videoAutoplay: true,
    videoMute: false,
    videoShowControls: true,
    showFullHeight: false,
    exactTextMatch: false,
    cardShowTriangle: true,
    listShowDeleted: false,
  },
  actionsToSaveOn: [TOGGLE_SETTINGS_BOOL],
})

export const toggleSettingsPage = () => {
  return {
    type: TOGGLE_SETTINGS_VIS,
  }
}

export const toggleSetting = (key) => {
  return {
    type: TOGGLE_SETTINGS_BOOL,
    key,
  }
}


const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_VIS:
      return {
        ...state,
        show: !state.show,
      }
    case TOGGLE_SETTINGS_BOOL:
      return {
        ...state,
        [action.key]: !state[action.key],
      }
    default:
      return state
  }
}
export default subReducer