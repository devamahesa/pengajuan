import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import PengajuanPage from "pages/PengajuanPage.vue";
import CustomerPage from "pages/CustomerPage.vue";
import VehiclePage from "pages/VehiclePage.vue";
import CustomerForm from "components/CustomerForm.vue";
import PinjamanPage from "pages/PinjamanPage.vue";
import PengajuanForm from "components/PengajuanForm.vue";

const useRoutes = (routes) => {
  return routes.map((route) => ({
    ...route,
    meta: {
      layout: MainLayout,
    }
  }))
}

const routes = useRoutes( [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: IndexPage,
        name: 'IndexPage'
      },
      {
        path: '/pengajuan',
        children: [
          {
            path: '',
            name: 'Pengajuan',
            component: PengajuanPage
          },
          {
            path: 'create',
            name: 'PengajuanForm',
            component: PengajuanForm
          }
        ]
      },
      {
        path: '/kendaraan',
        children: [
          {
            path: '',
            name: 'Vehicle',
            component: VehiclePage
          },
        ]
      },
      {
        path: '/customer',
        children: [
          {
            path: '',
            name: 'Customer',
            component: CustomerPage
          },
          {
            path: 'create',
            name: 'CustomerForm',
            component: CustomerForm
          }
        ],

      },
      {
        path: '/kredit',
        children: [
          {
            path: '',
            name: 'Pinjaman',
            component: PinjamanPage
          },
        ]
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
])

export default routes
