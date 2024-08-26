<script setup>
import AppPage from "components/AppPage.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {
  getListCustomer,
  getListPinjaman,
  getListPinjamanByIdVehicle,
  getNextNumber, postPengajuan
} from "src/lib/api.js";
import {useRouter} from "vue-router";
import QPreloadedSelect from "components/QPreloadedSelect.vue";
import useNotify from "src/plugins/notify.js";

const notify = useNotify();
const router = useRouter();

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

const back = () => {
  return router.push({name: 'Pengajuan'})
}

const onSubmit = async () => {
  const valid = await $vuelidateForm.value.$validate();
  if(valid){
    let params = {
      noPengajuan: pengajuan.value.noPengajuan,
      idCustomer: pengajuan.value.customer,
      idKendaraan: pengajuan.value.kendaraan,
      idPinjaman: pengajuan.value.pinjaman
    }
    return postPengajuan(params)
      .then((res) => {
        notify.show({message: res.data, type: 'success'})
        return back()
      }).catch((err) => {
        notify.show({message: err.message, type: 'error'})
      }).finally(() => {

      })
  }
}

onMounted(() => {
  getNextNumber().then(res =>{
    pengajuan.value.noPengajuan = res.data
  })
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
                <QPreloadedSelect
                  label="Nama Customer"
                  required
                  option-label="custName"
                  option-value="id_cust"
                  v-model="pengajuan.customer"
                  :options="customerOptions.value"
                  @filter="filterCustomer"
                  @blur="$vuelidateForm.customer.$touch"
                  :errors="$vuelidateForm.customer.$errors"
                />
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
                <QPreloadedSelect
                  label="Kendaraan"
                  required
                  option-label="type"
                  option-value="id_kendaraan"
                  v-model="pengajuan.kendaraan"
                  :options="kendaraanOptions.value"
                  @filter="filterKendaraan"
                  @blur="$vuelidateForm.kendaraan.$touch"
                  :errors="$vuelidateForm.kendaraan.$errors"
                  @update:model-value="resetPinjaman"
                />
              </div>

              <div class="col-6 q-pr-md q-gutter-y-sm">
                <QPreloadedSelect
                  :disable="!pengajuan.kendaraan"
                  label="Lama Kredit"
                  required
                  option-label="lamaKredit"
                  option-value="id_pinjaman"
                  v-model="pengajuan.pinjaman"
                  :options="pinjamanOptions.value"
                  @filter="filterPinjaman"
                  @blur="$vuelidateForm.pinjaman.$touch"
                  :errors="!!pengajuan.kendaraan ? $vuelidateForm.pinjaman.$errors : []"
                />
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
