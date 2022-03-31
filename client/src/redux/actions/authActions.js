import { GLOBAL_TYPES } from './../types/globalTypes'
import { getDataAPI, postDataAPI, patchDataAPI } from './../../utils/fetchData'
import { uploadImages } from './../../utils/imageHelper'

export const register = (userData) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/register', userData)
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        accessToken: res.data.accessToken
      }
    })

    localStorage.setItem('foodonate_authenticated', 'true')

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

export const login = (userData) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/login', userData)
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: res.data
    })

    localStorage.setItem('foodonate_authenticated', 'true')

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

export const logout = () => async(dispatch) => {
  try {
    const res = await getDataAPI('auth/logout')
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {}
    })

    localStorage.removeItem('foodonate_authenticated')

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

export const refreshToken = () => async(dispatch) => {
  const isAuthenticated = localStorage.getItem('foodonate_authenticated')
  if (!isAuthenticated) return
  
  try {
    const res = await getDataAPI('auth/refresh_token')
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: res.data
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

export const editProfile = (userData, auth) => async(dispatch) => {
  try {
    let imgRes = ''
    if (userData.gambar) {
      imgRes = await uploadImages([userData.gambar])
    }

    const res = await patchDataAPI('auth/profile', { ...userData, avatar: userData.gambar ? imgRes[0] : userData.avatar }, auth.accessToken)
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: {
          ...auth.user,
          ...res.data.user
        },
        accessToken: auth.accessToken
      }
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