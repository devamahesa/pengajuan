import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
import PengajuanPage from "pages/PengajuanPage.vue";
import CustomerPage from "pages/CustomerPage.vue";
import VehiclePage from "pages/VehiclePage.vue";

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
        name: 'Pengajuan',
        component: PengajuanPage
      },
      {
        path: '/kendaraan',
        name: 'Vehicle',
        component: VehiclePage
      },
      {
        path: '/customer',
        name: 'Customer',
        component: CustomerPage
      }
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
