export const sidebarMenu = [
  {
    name: 'Home',
    to: 'IndexPage',
    icon: 'home'
  },
  {
    name: 'Master',
    icon: 'toc',
    children : [
      {
        name: 'Customer',
        icon: 'person_outline',
        to: 'Customer',
      },
      {
        name: 'Vehicles',
        icon: 'directions_car',
        to: 'Vehicle',
      },

    ]
  },
  {
    name: 'Pengajuan',
    icon: 'account_balance',
    to: 'Pengajuan'
  }
]
