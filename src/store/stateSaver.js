import _ from "lodash"

export const middlewares = []

const stateSaver = ({
  mapStateToSave,
  key,
  initialState,
  actionsToSaveOn,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  // used for debugging when adding lots of new sub states
  alwaysUseInitialState = false, 
 // used for saved objects to see if initialState should overwrite missing props
 // useful for when adding new properties to existing object so they get saved as initial state's value
  mergeWithInitialState = false,
}) => {
  const reduxMiddleware = ({ getState }) => next => action => {
    const result = next(action)
    if (actionsToSaveOn.includes(action.type)) {
      const saveState = mapStateToSave(getState())
      localStorage.setItem(key, serialize(saveState))
    }

    return result

  }

  middlewares.push(reduxMiddleware)

  const previouslySavedValue = deserialize(localStorage.getItem(key))
  if (alwaysUseInitialState || previouslySavedValue === null) {
    return initialState
  }

  if(mergeWithInitialState) {
    return _.assign(_.cloneDeep(initialState), previouslySavedValue)
  }
  return previouslySavedValue
}

export default stateSaver
