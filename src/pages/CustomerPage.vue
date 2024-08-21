<script setup>

import {onMounted, ref} from "vue";
import {getCustomer, getListCustomer} from "src/lib/api.js";
import AppPage from "components/AppPage.vue";
import dayjs from "dayjs";
import {useRoute, useRouter} from "vue-router";
import ('dayjs/locale/id');



const columns = [
  {name: 'custName', align:'left', label: 'Nama Pelanggan', field:'custName', sortable: true},
  {name: 'nik', align:'left', label: 'NIK', field:'nik', sortable: true},
  {name: 'birthDate', align:'left', label: 'Tanggal Lahir', field:'birthDate', sortable: true},
  {name: 'maritalStatus', align:'left', label: 'Status', field:'maritalStatus', sortable: true},
  {name: 'ktpFilename', align:'left', label: 'KTP', field:'ktpFilename'},
  {name: 'kkFilename', align:'left', label: 'KK', field:'kkFilename'},
  {name: 'actions', align:'center', label: 'Aksi'},
]

const allData = ref([])

const router = useRouter();

onMounted(() => {
  getListCustomer().then((res) =>{
    allData.value = res.data
  }).catch(err => {
    console.log(err)
  })
});

function createNewCustomer() {
  return router.push({name: 'CustomerForm'})
}

const filter = ref('')
const viewDialog = ref(false);

</script>

<template>
 <AppPage title="Pelanggan" subtitle="Menampilkan data semua pelanggan">

   <template v-slot:default>
     <div class="q-py-md">
       <div class="col q-py-md" align="right">
         <q-btn unelevated color="primary" @click="createNewCustomer()">Tambah</q-btn>
       </div>

       <q-card>
         <q-table
           :rows="allData"
           :columns="columns"
           :filter="filter"
         >
           <template v-slot:top-right>
             <q-input dense outlined debounce="300" v-model="filter" placeholder="Search" clearable>
               <template v-slot:append>
                 <q-icon name="search"/>
               </template>
             </q-input>
           </template>

           <template v-slot:body-cell-actions="props">
             <q-td :props="props">
               <div class="q-pa-sm q-gutter-sm">
                 <q-btn outline color="info" size="sm" round icon="visibility" @click="viewDialog = true">
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

           <template v-slot:body-cell-birthDate="props">
             <q-td :props="props">
               {{dayjs(props.row.birthDate).locale('id').format('D MMMM YYYY')}}
             </q-td>
           </template>
         </q-table>
       </q-card>

       <q-dialog
         v-model="viewDialog"
         transition-show="fade"
         transition-hide="fade"
         transition-duration="200"
       >
         <q-card>
           <q-card-section>
             <div class="text-h6">Inception</div>
           </q-card-section>

           <q-card-section class="q-pt-none">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis laudantium minus earum totam modi laborum illo, corporis fuga saepe animi aliquam ea enim assumenda ut nulla natus aperiam quis. Iste.
           </q-card-section>

           <q-card-actions align="right" class="text-primary">
             <q-btn flat label="Open another dialog" />
             <q-btn flat label="Close" v-close-popup />
           </q-card-actions>
         </q-card>
       </q-dialog>

     </div>
   </template>
 </AppPage>
</template>
