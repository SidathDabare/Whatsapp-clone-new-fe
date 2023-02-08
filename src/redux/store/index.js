/** @format */

import profilesReducer from "../reducers/profileReducer"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import chatReducer from "../reducers/chatReducer"



const bigReducer = combineReducers({
  profile: profilesReducer,
  chat: chatReducer
})





const store = configureStore({
  reducer: bigReducer
})

export default store



