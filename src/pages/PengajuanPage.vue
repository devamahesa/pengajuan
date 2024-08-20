<script setup>

import AppPage from "components/AppPage.vue";

const columns = [

  { name: 'name', align: 'center', label: 'Nama', field: 'name', sortable: true },
  { name: 'nik', label: 'NIK', field: 'nik', sortable: true },
  { name: 'tgl_lahir', label: 'tgl_lahir', field: 'tgl_lahir',sortable: true },
  { name: 'dokumen', label: 'dokumen', field: 'dokumen',sortable: true },
  { name: 'status', align:'center', label: 'status', field: 'status',sortable: true },
  { name: 'actions', align:'center', label: 'action'},
]

const rows = [
  {
    name: 'si A',
    nik: 510403820493,
    tgl_lahir: '2025-01-21',
    dokumen: 'KTP, KK, Form Aplikasi',
    status: 'PENGAJUAN'
  },
  {
    name: 'si B',
    nik: 510403838493,
    tgl_lahir: '2025-02-22',
    dokumen: 'KTP, KK, Form Aplikasi',
    status: 'APPROVED'
  },
  {
    name: 'si C',
    nik: 510403103493,
    tgl_lahir: '2025-02-23',
    dokumen: 'KTP, KK, Form Aplikasi',
    status: 'DITOLAK'
  },
]

</script>

<template>
  <AppPage title="Semua Pengajuan" subtitle="Menampilkan semua list pengajuan pembiayaan">
    <template v-slot:default>
      <div class="q-py-md">
        <q-table
          title="Data Pengajuan"
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-status="props">
            <q-td
              :props="props">
              <q-btn dense outline color="primary" :ripple="false">{{props.row.status}}</q-btn>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="q-pa-sm q-gutter-sm">
                <q-btn outline unelevated color="green" size="sm" round icon="done"><q-tooltip>Approve</q-tooltip></q-btn>
              </div>
            </q-td>
          </template>

        </q-table>
      </div>
    </template>
  </AppPage>
</template>
