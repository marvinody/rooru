import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import page from './page'
import pics from './pics'
import tags from './tags'
export * from './page'
export * from './pics'
export * from './tags'

const reducer = combineReducers({
  pics,
  page,
  tags,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store

