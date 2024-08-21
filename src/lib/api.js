import {get,post} from "src/lib/httpHelper.js";

export const getCustomer = (id) => {
  return get({path: `/customer/${id}`})
}

export const postCustomer = (data) => {
  return post({path: '/customer', data: data})
}

export const getListCustomer = () => {
  return get({path: '/customer'})
}

export const getListVehicle = () => {
  return get({path: '/vehicle'})
}
