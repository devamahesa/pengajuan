import {get,post, put} from "src/lib/httpHelper.js";

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

export const getListPinjaman = () => {
  return get({path: 'vehicle/pinjaman'})
}

export const getListPinjamanByIdVehicle = (idVehicle) => {
  return get({path: `pinjaman/vehicle/${idVehicle}`})
}

export const getListPengajuan = () => {
  return get({path: 'pengajuan'})
}

export const postPengajuan = (params) => {
  return post({path : '/pengajuan', params: params})
}

export const getNextNumber = () => {
  return get({path: '/pengajuan/nextGeneratedNum'})
}

export const putApprovalStatus = (id, params) => {
  return put({path: `/pengajuan/approval/${id}`, params: params})
}

export const getVehicleRankDashboards = (param) => {
  return get({path: '/dashboard/vehicles/rank', params: param})
}
