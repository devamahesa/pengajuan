<script setup>
import AppPage from "components/AppPage.vue";
import {onMounted, ref} from "vue";
import {getListVehicle, getVehicleRankDashboards} from "src/lib/api.js";
import {toIDR} from "../utils/currencyFormatter.js";
import Chart from "chart.js/auto";

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

const dataRank = ref([])

const createChart = (data) => {
  new Chart(document.getElementById('chart'),{
    type: 'bar',
    data: {
      labels: data.map(row => row.rank),
      datasets: [
        {
          label: 'Total Harga Kendaraan Tersedia (Miliar)',
          data: data.map(row => row.priceSum/(10**9))
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scaleShowValues: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            autosSkip: false,
          }
        }]
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Total Harga Kendaraan'
        }
      },
      animations: {
        duration: 1000
      },
      transitions: {
        show: {
          animations: {
            x: {from: 0},
            y: {from: 0}
          }
        }
      },
      hide: {
        animations: {
          x: {to: 0},
          y: {to: 0}
        }
      },
    }
  })
}

const fetchRankData =  () => {
  getVehicleRankDashboards({rankParam: 'price'}).then(res => {
    dataRank.value = res.data
    createChart(dataRank.value)
  })
}




onMounted(() => {
  fetchRankData()
  getListVehicle().then((res) =>{
    allData.value = res.data
  })
});

</script>

<template>
  <AppPage title="Semua Kendaraan" subtitle="Menampilkan semua list kendaraan">
    <template v-slot:default>
      <div class="q-py-md">

        <div class="col q-py-md">
          <q-card class="q-pa-lg flex-block">

            <div class="row" >
              <div class="col-8">

              </div>
              <div class="col-4" >
                <canvas id="chart" style="height: 100%"/>
              </div>

            </div>

          </q-card>
        </div>

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
              {{toIDR(props.row.harga)}}
            </q-td>
          </template>
        </q-table>
      </div>
    </template>
  </AppPage>
</template>

