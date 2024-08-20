<script setup>
import AppPage from "components/AppPage.vue";
import {onMounted, ref} from "vue";
import {getListCustomer, getListVehicle} from "src/lib/api.js";
import dayjs from "dayjs";

const allData = ref([])

const columns = [
  {name: 'dealer', align:'left', label: 'Dealer', field:'dealer', sortable: true},
  {name: 'merk', align:'left', label: 'Merk', field:'merk', sortable: true},
  {name: 'model', align:'left', label: 'Model', field:'model', sortable: true},
  {name: 'type', align:'left', label: 'Type', field:'type', sortable: true},
  {name: 'warna', align:'left', label: 'Warna', field:'warna', sortable: true},
  {name: 'harga', align:'right', label: 'Harga', field:'harga', sortable: true},
  {name: 'actions', align:'center', label: 'Aksi'},
]

onMounted(() => {
  getListVehicle().then((res) =>{
    allData.value = res
  })
});

</script>

<template>
  <AppPage title="Semua Kendaraan" subtitle="Menampilkan semua list kendaraan">
    <template v-slot:default>
      <div class="q-py-md">
        <q-table
          :rows="allData"
          :columns="columns"
          row-key="name"
        >


          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="q-pa-sm q-gutter-sm">
                <q-btn outline color="info" size="sm" round icon="visibility">
                  <q-tooltip>View</q-tooltip>
                </q-btn>
                <q-btn outline color="warning" size="sm" round icon="edit">
                  <q-tooltip>Edit</q-tooltip>
                </q-btn>
                <q-btn outline color="negative" size="sm" round icon="delete">
                  <q-tooltip>Delete</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-harga="props">
            <q-td :props="props">
              {{new Intl.NumberFormat('id-ID',{style: 'currency',currency: 'IDR'}).format(props.row.harga)}}
            </q-td>
          </template>
        </q-table>
      </div>
    </template>
  </AppPage>
</template>

