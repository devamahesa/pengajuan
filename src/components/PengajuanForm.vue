<script setup>
import AppPage from "components/AppPage.vue";
import {useQuasar} from "quasar";
import {onMounted, reactive, ref, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {
  getCustomer,
  getListCustomer,
  getListPinjaman,
  getListPinjamanByIdVehicle,
  getListVehicle
} from "src/lib/api.js";

const $q = useQuasar();
const pengajuan = ref({
  noPengajuan: null,
  buktiBayarFilename: null,
  formPengajuanFilename: null,
  customer: null,
  kendaraan: null,
  pinjaman: null,
})

const rules = {
  noPengajuan: {required},
  customer: {required},
  kendaraan: {required},
  pinjaman: {required},
}

const customerOptions = reactive([]);
const kendaraanOptions = reactive([]);
const pinjamanOptions = reactive([]);

const resetPinjaman = () => {
  return pengajuan.value.pinjaman = null
}

const filterCustomer =  (val, update, abort) => {
  update(async () => {
    const needle = val.toLowerCase()
    await getListCustomer().then(res => {
      customerOptions.value = res.data.filter(option => {
        return option.custName.toLowerCase().indexOf(needle) > -1
      })
    })
  })
}

const filterKendaraan = (val, update, abort) => {
  update(async () => {
    const needle = val.toLowerCase()
    await getListPinjaman().then(res => {
      kendaraanOptions.value = res.data.filter(option => {
        return option.type.toLowerCase().indexOf(needle) > -1
      })
    })
  })
}

const filterPinjaman = (val, update, abort) => {
  if(pengajuan.value.kendaraan){
    update(async () => {
      const idVehicle = pengajuan.value.kendaraan
      const needle = val.toLowerCase()
      await getListPinjamanByIdVehicle(idVehicle).then(res =>{
        pinjamanOptions.value = res.data.filter(option => {
          return toString(option.lamaKredit).toLowerCase().indexOf(needle) > -1
        })
      })
    })
  }
}


const onSubmit = () => {
  console.log(pengajuan.value)
}

onMounted(() => {
  pengajuan.value.noPengajuan = 'CRE/CUST/007'
})

const $vuelidateForm = useVuelidate(rules, pengajuan)

</script>

<template>
  <AppPage title="Tambah Pengajuan Kredit" subtitle="Masukkan data untuk pengajuan kredit">
    <template v-slot:default>
      <div class="q-py-md">
        <q-card class="q-pa-lg">
          <q-form
            @submit="onSubmit()"
            class="q-gutter-md"
          >
            <h6 class="q-ma-sm">{{'Input Data Pengajuan Kredit'}}</h6>

            <div class="row q-my-lg">
              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Nama Customer<span class="text-red">*</span></label>
                <q-select
                  use-input
                  clearable
                  outlined dense
                  v-model="pengajuan.customer"
                  lazy-rules
                  :options="customerOptions.value"
                  map-options
                  emit-value
                  option-label="custName"
                  option-value="id_cust"
                  @blur="$vuelidateForm.customer.$touch"
                  :error="$vuelidateForm.customer.$errors.length>0"
                  @filter="filterCustomer"
                >
                  <template v-slot:error>
                    <div v-for="err in $vuelidateForm.customer.$errors" :key="err.$uid">
                      {{ err?.$message }}
                    </div>
                  </template>

                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>

                </q-select>
              </div>

              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Nomor Pengajuan</label>
                <q-input
                  clearable
                  outlined dense
                  lazy-rules
                  v-model="pengajuan.noPengajuan"
                  @blur="$vuelidateForm.noPengajuan.$touch"
                  :error="$vuelidateForm.noPengajuan.$errors.length>0"
                  readonly
                ></q-input>
              </div>

            </div>

            <div class="row q-my-lg">
              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Kendaraan<span class="text-red">*</span></label>
                <q-select
                  use-input
                  clearable
                  outlined dense
                  v-model="pengajuan.kendaraan"
                  lazy-rules
                  :options="kendaraanOptions.value"
                  map-options
                  emit-value
                  option-label="type"
                  option-value="id_kendaraan"
                  @blur="$vuelidateForm.kendaraan.$touch"
                  :error="$vuelidateForm.kendaraan.$errors.length>0"
                  @filter="filterKendaraan"
                  @update:model-value="resetPinjaman"
                >
                  <template v-slot:error>
                    <div v-for="err in $vuelidateForm.kendaraan.$errors" :key="err.$uid">
                      {{ err?.$message }}
                    </div>
                  </template>

                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>

                </q-select>
              </div>

              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Lama Kredit<span class="text-red">*</span></label>
                <q-select
                  :disable="!pengajuan.kendaraan"
                  use-input
                  clearable
                  outlined dense
                  v-model="pengajuan.pinjaman"
                  lazy-rules
                  map-options
                  emit-value
                  option-label="lamaKredit"
                  option-value="id_pinjaman"
                  :options="pinjamanOptions.value"
                  @blur="$vuelidateForm.pinjaman.$touch"
                  :error="$vuelidateForm.pinjaman.$errors.length>0"
                  @filter="filterPinjaman"
                >
                  <template v-slot:error>
                    <div v-for="err in $vuelidateForm.pinjaman.$errors" :key="err.$uid">
                      {{ err?.$message }}
                    </div>
                  </template>

                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>

                </q-select>
              </div>
            </div>

            <h6 class="q-ma-sm">{{'Upload Dokumen Pendukung'}}</h6>

            <div class="row q-my-lg">
              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Bukti Bayar</label>
                <q-file outlined dense v-model="pengajuan.buktiBayarFilename" accept=".pdf">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>

              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Formulir Pengajuan</label>
                <q-file outlined dense v-model="pengajuan.formPengajuanFilename" accept=".pdf">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>

            <div>
              <q-btn class="q-mx-sm" outline color="negative" label="Back" @click="back()"/>
              <q-btn class="q-mx-sm" unelevated color="primary" label="Submit" @click="onSubmit()" />
            </div>

          </q-form>



        </q-card>
      </div>
    </template>
  </AppPage>


</template>
