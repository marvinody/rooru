import stateSaver from './stateSaver'
const SET_SHOW_NSFW = 'SET_SHOW_NSFW'
const SET_HIDE_NSFW = 'SET_HIDE_NSFW'




const initialState = stateSaver({
  mapStateToSave: state => state.showNSFW,
  key: 'showNSFW',
  initialState: false,
  actionsToSaveOn: [SET_HIDE_NSFW, SET_SHOW_NSFW]
})

export const setShowNSFW = () => ({
type: SET_SHOW_NSFW,
})

export const setHideNSFW = () => ({
  type: SET_HIDE_NSFW,
})


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_NSFW:
      return true
    case SET_HIDE_NSFW:
      return false
    default:
      return state
  }
}
