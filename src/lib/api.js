import {get} from "src/lib/httpHelper.js";

export const getCustomer = (id) => {
  return get({path: `/customer/${id}`})
}

export const getListCustomer = () => {
  return get({path: '/customer'})
}

export const getListVehicle = () => {
  return get({path: '/vehicle'})
}
