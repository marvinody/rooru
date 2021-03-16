
export const middlewares = []

const stateSaver = ({
  mapStateToSave,
  key,
  initialState,
  actionsToSaveOn,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}) => {
  const reduxMiddleware = ({getState}) => next => action => {
    const result =  next(action)
    if(actionsToSaveOn.includes(action.type)) {
      const saveState = mapStateToSave(getState())
      localStorage.setItem(key, serialize(saveState))
    }

    return result

  }

  middlewares.push(reduxMiddleware)

  const previouslySavedValue = deserialize(localStorage.getItem(key))
  if (previouslySavedValue === undefined) {
    return initialState
  }
  return previouslySavedValue
}

export default stateSaver
