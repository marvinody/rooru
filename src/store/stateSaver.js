
export const middlewares = []

const stateSaver = ({
  mapStateToSave,
  key,
  initialState,
  actionsToSaveOn,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  alwaysUseInitialState = false, // used for debugging when adding lots of new sub states
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
  return previouslySavedValue
}

export default stateSaver
