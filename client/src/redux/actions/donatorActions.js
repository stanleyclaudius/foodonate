import { GLOBAL_TYPES } from './../types/globalTypes'
import { DONATOR_TYPES } from './../types/donatorTypes'
import { deleteDataAPI, getDataAPI } from './../../utils/fetchData'

export const getDonator = token => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('donator/verified', token)
    dispatch({
      type: DONATOR_TYPES.GET_VERIFIED_DONATOR,
      payload: res.data.donators
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const deleteDonator = (id, token) => async(dispatch) => {
  try {
    const res = await deleteDataAPI(`donator/${id}`, token)
    dispatch({
      type: DONATOR_TYPES.DELETE_DONATOR,
      payload: id
    })
    
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}