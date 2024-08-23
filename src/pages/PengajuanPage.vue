<script setup>

import AppPage from "components/AppPage.vue";
import {onMounted, ref} from "vue";
import {getListPengajuan} from "src/lib/api.js";
import {toIDR} from "../utils/currencyFormatter.js";
import {useRouter} from "vue-router";

const filter = ref(null)

const columns = [

  { name: 'noPengajuan', align: 'left', label: 'No Pengajuan', field: 'noPengajuan', sortable: true },
  { name: 'customer', align: 'left',label: 'Nama Pelanggan', field: 'customer', sortable: true },
  { name: 'dealer', align: 'left',label: 'Dealer', field: 'dealer', sortable: true },
  { name: 'type', align: 'left',label: 'Mobil', field: 'type', sortable: true },
  { name: 'downPayment', label: 'Down Payment', field: 'downPayment',sortable: true },
  { name: 'formPengajuanFilename', label: 'Dokumen Pengajuan', field: 'formPengajuanFilename',sortable: true },
  { name: 'status', align:'center', label: 'Status', field: 'status',sortable: true },
  { name: 'actions', align:'center', label: 'Action'},
]

const rows = ref([])
const router = useRouter();

onMounted(() => {
  getListPengajuan().then((res) => {
    rows.value = res.data
  })
})

function createNewCustomer() {
  return router.push({name: 'PengajuanForm'})
}

const viewDialog = ref(false);

</script>

<template>
  <AppPage title="Semua Pengajuan" subtitle="Menampilkan semua list pengajuan pembiayaan">
    <template v-slot:default>
      <div class="q-py-md">

        <div class="col q-py-md" align="right">
          <q-btn unelevated color="primary" @click="createNewCustomer()">Tambah</q-btn>
        </div>

        <q-table
          :rows="rows"
          :columns="columns"
          row-key="noPengajuan"
          :filter="filter"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div v-if="props.row.status === 'APPROVED'">
                <q-btn size="sm" outline color="positive" :ripple="false">{{props.row.status}}</q-btn>
              </div>
              <div v-if="props.row.status === 'PENGAJUAN'">
                <q-btn size="sm" outline color="info" :ripple="false">{{props.row.status}}</q-btn>
              </div>
              <div v-if="props.row.status === 'DITOLAK'">
                <q-btn size="sm" outline color="negative" :ripple="false">{{props.row.status}}</q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-customer="props">
            <q-td
              :props="props">
              {{props.row.customer.custName}}
            </q-td>
          </template>

          <template v-slot:body-cell-dealer="props">
            <q-td
              :props="props">
              {{props.row.vehicles.dealer}}
            </q-td>
          </template>

          <template v-slot:body-cell-type="props">
            <q-td
              :props="props">
              {{props.row.vehicles.type}}
            </q-td>
          </template>

          <template v-slot:body-cell-downPayment="props">
            <q-td
              :props="props">
              {{toIDR(props.row.pinjaman.downPayment)}}
            </q-td>
          </template>

          <template v-slot:body-cell-formPengajuanFilename="props">
            <q-td :props="props">
              <q-btn flat size="sm" stack color="primary" label="Form" icon="description"></q-btn>
              <q-btn flat size="sm" stack color="primary" label="Invoice" icon="description"></q-btn>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="q-pa-sm q-gutter-sm" v-if="props.row.status === 'PENGAJUAN'">
                <q-btn unelevated color="warning" round size="sm" icon="fact_check" @click="viewDialog = true"><q-tooltip>Approve</q-tooltip></q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:top-right>
            <q-input dense outlined debounce="300" v-model="filter" placeholder="Search" clearable>
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </template>

        </q-table>

        <q-dialog
          persistent
          v-model="viewDialog"
          transition-show="fade"
          transition-hide="fade"
          transition-duration="200"
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">Approval</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Apakah anda yakin approve pengajuan ini ?
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Ya" />
              <q-btn flat label="Tidak" color="negative" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </div>
    </template>
  </AppPage>
</template>
