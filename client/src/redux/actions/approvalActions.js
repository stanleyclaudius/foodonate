import { GLOBAL_TYPES } from './../types/globalTypes'
import { DONATOR_TYPES } from './../types/donatorTypes'
import { getDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData'

export const getUnverifiedDonator = token => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('donator/unverified', token)
    dispatch({
      type: DONATOR_TYPES.GET_UNVERIFIED_DONATOR,
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

export const verifyDonator = (id, token) => async(dispatch) => {
  try {
    const res = await patchDataAPI(`donator/accept/${id}`, {}, token)
    dispatch({
      type: DONATOR_TYPES.CHANGE_STATUS,
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

export const rejectDonator = (id, token) => async(dispatch) => {
  try {
    const res = await deleteDataAPI(`donator/reject/${id}`, token)
    dispatch({
      type: DONATOR_TYPES.CHANGE_STATUS,
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