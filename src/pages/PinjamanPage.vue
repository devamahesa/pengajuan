<script setup>
import AppPage from "components/AppPage.vue";
import {onMounted, ref} from "vue";
import {getListPinjaman} from "src/lib/api.js";
import {toIDR} from "../utils/currencyFormatter.js";

const allData = ref([])

onMounted(() => {
  getListPinjaman().then((res) => {
    allData.value = res.data
  })
})

const getArrMonth = (arrPinjaman) => {
  let arr = []
  for(let i=0; i<arrPinjaman.length; i++){
    arr.push(arrPinjaman[i].lamaKredit)
  }
  return arr
}

const changeRow = ref(null)

const filter = ref('')

const columns = [
  { name: 'expand', align: 'left'},
  { name: 'dealer', align: 'left', label: 'Dealer', field: 'dealer', sortable: true,  },
  { name: 'merk', align: 'left', label: 'Merk', field: 'merk', sortable: true,  },
  { name: 'type', align:'left', label: 'Type Mobil', field: 'type', sortable: true },
  { name: 'harga', align:'right', label: 'Harga Cash', field: 'harga',sortable: true },
  { name: 'actions', align:'center', label: 'Action'},
]

</script>

<template>
 <AppPage title="Pinjaman / Kredit" subtitle="Menampilkan data tabel kredit mobil">

   <template v-slot:default>
     <div class="q-py-md">

       <q-table
         :rows="allData"
         :columns="columns"
         :filter="filter"
         row-key="id_kendaraan"
       >
         <template v-slot:header="props">
           <q-tr :props="props">
             <q-th auto-width />
             <q-th
               v-for="col in props.cols"
               :key="col.name"
               :props="props"
             >
               {{ col.label }}
             </q-th>
           </q-tr>
         </template>

         <template v-slot:body="props">
           <q-tr :props="props">
             <q-td auto-width>
               <q-btn
                 outline size="sm" color="primary" dense
                 @click="props.expand = !props.expand"
                 :icon="props.expand ? 'remove' : 'add'"
               >
                 <q-tooltip>{{'Expand for details'}}</q-tooltip>
               </q-btn>
             </q-td>

             <q-td
               v-for="col in props.cols"
               :key="col.name"
               :props="props"
             >
               <div v-if="col.name !== 'actions'">
                 {{ col.name ==='harga' ? toIDR(col.value) : col.value }}
               </div>

               <div class="q-pa-sm q-gutter-sm" v-else>
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
           </q-tr>

           <q-tr v-show="props.expand" :props="props" v-for="(data, index) in props.row.pinjaman" :key="index">
             <q-td colspan="100%">
               <div class="row">
                 <div class="col" v-for="(col, i) in ['Asuransi','Lama Kredit', 'DP', 'Angsuran']" :key="i">
                   <p style="color: #3a3a3a" class="q-my-xs">{{col}}</p>
                 </div>
               </div>
               <div class="row">
                 <div class="col">
                   {{data.asuransi}}
                 </div>
                 <div class="col">
                   {{`${data.lamaKredit} Bulan`}}
                 </div>
                 <div class="col">
                   {{toIDR(data.downPayment)}}
                 </div>
                 <div class="col">
                   {{toIDR(data.angsuran)}}
                 </div>
               </div>
             </q-td>
           </q-tr>
         </template>

         <template v-slot:top-right>
           <q-input dense outlined debounce="300" v-model="filter" placeholder="Search" clearable>
             <template v-slot:append>
               <q-icon name="search"/>
             </template>
           </q-input>
         </template>

       </q-table>

     </div>
   </template>
 </AppPage>
</template>

