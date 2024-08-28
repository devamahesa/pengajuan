import axios from "axios";

const baseUrl = import.meta.env.VITE_BE_URL;

export const get = ({path, params, isNeedAuth = false, isMultipartForm = false}) => {
  return new Promise((resolve, reject) => {
    return axios({
      baseURL: baseUrl,
      method: 'get',
      url: path,
      params: params,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err.response?.data)
    })
  })
}

export const post = ({path, data, params = null, isNeedAuth = false, isMultipartForm = false}) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      method: 'post',
      url: path,
      data: data,
      params: params,
    }).then((res) => {
      resolve(res)
    }, ).catch((err) => {
      reject(err.response?.data)
    })
  })
}

export const put = ({path, data, params = null, isNeedAuth = false, isMultipartForm = false}) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      method: 'put',
      url: path,
      data: data,
      params: params,
    }).then((res) => {
      resolve(res)
    }, ).catch((err) => {
      reject(err.response?.data)
    })
  })
}
