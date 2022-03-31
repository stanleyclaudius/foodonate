import { DONATOR_TYPES } from './../types/donatorTypes'

const approvalReducer = (state = [], action) => {
  switch (action.type) {
    case DONATOR_TYPES.GET_UNVERIFIED_DONATOR:
      return action.payload
    case DONATOR_TYPES.CHANGE_STATUS:
      return state.filter(item => item._id !== action.payload)
    default:
      return state
  }
}

export default approvalReducer