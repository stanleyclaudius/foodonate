import { GLOBAL_TYPES } from './../types/globalTypes'
import { EVENT_TYPES } from './../types/eventTypes'
import { getDataAPI, patchDataAPI, postDataAPI, deleteDataAPI } from './../../utils/fetchData'
import { uploadImages } from './../../utils/imageHelper'

export const getFilteredEvent = (page = 1, kategori = [], lokasi = [], urutkan = '') => async(dispatch) => {
  let kategoriQueryStr = ''
  let lokasiQueryStr = ''

  if (kategori.length > 0) {
    for (let i = 0; i < kategori.length; i++) {
      if (i !== (kategori.length - 1)) {
        kategoriQueryStr += `kategori=${kategori[i]}&`
      } else {
        kategoriQueryStr += `kategori=${kategori[i]}`
      }
    }
  }

  if (lokasi.length > 0) {
    for (let i = 0; i < lokasi.length; i++) {
      if (i !== (lokasi.length - 1)) {
        lokasiQueryStr += `lokasi=${lokasi[i]}&`
      } else {
        lokasiQueryStr += `lokasi=${lokasi[i]}`
      }
    }
  }

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await getDataAPI(`event/filter?${kategoriQueryStr}&${lokasiQueryStr}&urutkan=${urutkan}&page=${page}`)
    dispatch({
      type: EVENT_TYPES.GET_HOME_EVENT,
      payload: {
        data: res.data.events,
        totalPage: res.data.totalPage
      }
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

export const getEvent = () => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await getDataAPI('event')
    dispatch({
      type: EVENT_TYPES.GET_EVENT,
      payload: res.data.events
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

export const createEvent = (eventData, gambar, auth) => async(dispatch) => {
  try {
    const imageRes = await uploadImages([gambar])
    let imageUrl = imageRes[0]

    const res = await postDataAPI('event', { ...eventData, gambar: imageUrl }, auth.accessToken)
    dispatch({
      type: EVENT_TYPES.CREATE_EVENT,
      payload: res.data.event
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

export const registerEvent = (id, auth) => async(dispatch) => {
  try {
    const res = await patchDataAPI(`event/${id}`, {}, auth.accessToken)
    dispatch({
      type: EVENT_TYPES.REGISTER_EVENT,
      payload: { id, user: auth.user._id }
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

export const getEventByDonator = (token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('event/donator', token)
    dispatch({
      type: EVENT_TYPES.GET_EVENT_BY_DONATOR,
      payload: res.data.events
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

export const deleteEvent = (id, token) => async(dispatch) => {
  try {
    const res = await deleteDataAPI(`event/${id}`, token)
    dispatch({
      type: EVENT_TYPES.DELETE_EVENT,
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

export const updateEvent = (eventData, id, token) => async(dispatch) => {
  try {
    console.log(eventData.gambar)
    let imageResult = ''
    if (eventData.gambar && typeof eventData.gambar !== 'string') {
      imageResult = await uploadImages([eventData.gambar])
    }

    const res = await patchDataAPI(`event/edit/${id}`, { ...eventData, gambar: imageResult ? imageResult[0] : eventData.gambar }, token)
    dispatch({
      type: EVENT_TYPES.UPDATE_EVENT,
      payload: res.data.event
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