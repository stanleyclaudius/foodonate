import { EVENT_TYPES } from './../types/eventTypes'

const initialState = {
  data: []
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_TYPES.GET_EVENT:
      return {
        ...state,
        data: action.payload
      }
    case EVENT_TYPES.DELETE_EVENT:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    case EVENT_TYPES.REGISTER_EVENT:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload.id ? { ...item, pendaftar: [...item.pendaftar, action.payload.user] } : item)
      }
    default:
      return state
  }
}

export default eventReducer