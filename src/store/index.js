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
import ratingFilters from './ratingFilters'
import searchTags from './searchTags'
import { middlewares } from './stateSaver'

export * from './hasPics'
export * from './loadingPic'
export * from './loadingPics'
export * from './page'
export * from './pics'
export * from './selectedPic'
export * from './showModal'
export * from './tags'
export * from './ratingFilters'
export * from './searchTags'


const reducer = combineReducers({
  pics,
  page,
  tags,
  loadingPics,
  loadingPic,
  showModal,
  selectedPic,
  hasPics,
  searchTags,
  ratingFilters,
})
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true }),
    ...middlewares
  )
)
const store = createStore(reducer, middleware)

export default store
