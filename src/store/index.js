import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import hasPics from './hasPics'
import loadingPic from './loadingPic'
import loadingPics from './loadingPics'
import page from './page'
import pics from './pics'
import selectedPic from './selectedPic'
import showModal from './showModal'
import tags from './tags'
export * from './hasPics'
export * from './loadingPic'
export * from './loadingPics'
export * from './page'
export * from './pics'
export * from './selectedPic'
export * from './showModal'
export * from './tags'

const reducer = combineReducers({
  pics,
  page,
  tags,
  loadingPics,
  loadingPic,
  showModal,
  selectedPic,
  hasPics,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store

