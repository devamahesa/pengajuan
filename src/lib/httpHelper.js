import axios from "axios";

const baseUrl = import.meta.env.VITE_BE_URL;

export const get = ({path, params, isNeedAuth = false, isMultipartForm = false}) => {
  return axios({
    baseURL: baseUrl,
    method: 'get',
    url: path,
  }).then(res => {
    return res.data
  }).catch(err => {
    return err
  })
}
