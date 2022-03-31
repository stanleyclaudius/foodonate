import { DONATOR_TYPES } from './../types/donatorTypes'

const donatorReducer = (state = [], action) => {
  switch (action.type) {
    case DONATOR_TYPES.GET_VERIFIED_DONATOR:
      return action.payload
    case DONATOR_TYPES.DELETE_DONATOR:
      return state.filter(item => item._id !== action.payload)
    default:
      return state
  }
}

export default donatorReducer