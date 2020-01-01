import { combineReducers } from 'redux'
import appReducer from './components/App/appSlice'

export default combineReducers({
  app: appReducer
})
