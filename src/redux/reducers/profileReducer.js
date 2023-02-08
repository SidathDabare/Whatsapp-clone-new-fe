import {SET_LOGGED_IN_USER, SET_TOKEN,SET_PROFILES} from '../actions/index'
const initialState = {
  profiles: [],
  loggedInUser: null,
  token: "",
}

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      }

        case SET_TOKEN: {
            return {
                ...state, token: action.payload
            }
        }
        case SET_PROFILES: {
            return {
                ...state, profiles:action.payload
            }
        }
        default: 
        return state
    }
    
  
}

export default profilesReducer
