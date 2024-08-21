export const toIDR = (val) => {
  return new Intl.NumberFormat('id-ID',{style: 'currency',currency: 'IDR'}).format(val)
}
