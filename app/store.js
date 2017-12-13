import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import * as userReducers from './interactions/reducers/user'


const reducers = combineReducers({
  nav: userReducers.nav
})
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
  return createStore(reducers, initialState, enhancer)
}

const store = configureStore({})

export default store
