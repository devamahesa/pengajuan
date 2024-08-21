<script setup>
import AppPage from "components/AppPage.vue";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {postCustomer} from "src/lib/api.js";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useQuasar} from "quasar";

const $q = useQuasar();

const showNotif = (message) => {
  return $q.notify({
    type: 'positive',
    progress: true,
    message: 'Success',
    color: 'positive',
    position: "top-right",
    caption: message,
    icon: 'check_circle',
    timeout:'2000'
  })
}

const cust = ref({
  custName: null,
  nik: null,
  birthDate: null,
  maritalStatus: null,
  ktpFilename: null,
  kkFilename: null,
})

const router = useRouter();

const rules = {
  custName: {required},
  nik: {required},
  birthDate: {required},
  maritalStatus: {required},
}

const $vuelidateForm = useVuelidate(rules, cust)

const onSubmit  = async () => {
  const valid = await $vuelidateForm.value.$validate();
  if(valid){
    let data = cust.value
    return postCustomer(data)
      .then((res) => {
        console.log(res)
        showNotif(res.data);
        return back()
      }).catch((err) => {
        showNotif(err.message);
      }).finally(() => {

      })
  }
}

const back = () => {
  return router.push({name: 'Customer'})
}

</script>


<template>
  <AppPage title="Tambah Pelanggan" subtitle="Formulir input data pelanggan">
    <template v-slot:default>
      <div class="q-py-md">
        <q-card class="q-pa-lg">
          <q-form
            @submit="onSubmit()"
            class="q-gutter-md"
          >
            <div class="row q-my-lg">
              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Nama<span class="text-red">*</span></label>
                <q-input
                  clearable
                  outlined dense
                  lazy-rules
                  v-model="cust.custName"
                  @blur="$vuelidateForm.custName.$touch"
                  :error="$vuelidateForm.custName.$errors.length>0"
                >
                  <template v-slot:error>
                    <div v-for="err in $vuelidateForm.custName.$errors" :key="err.$uid">
                      {{ err?.$message }}
                    </div>
                  </template>
                </q-input>
              </div>

              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">NIK<span class="text-red">*</span></label>
                <q-input
                  clearable
                  outlined dense
                  v-model="cust.nik"
                  lazy-rules
                  @blur="$vuelidateForm.nik.$touch"
                  :error="$vuelidateForm.nik.$errors.length>0"
                >
                  <template v-slot:error>
                    <div v-for="err in $vuelidateForm.nik.$errors" :key="err.$uid">
                      {{ err?.$message }}
                    </div>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row q-my-lg">
              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Tanggal Lahir<span class="text-red">*</span></label>
                <q-input
                  clearable
                  outlined dense
                  v-model="cust.birthDate"
                  lazy-rules
                  @blur="$vuelidateForm.birthDate.$touch"
                  :error="$vuelidateForm.birthDate.$errors.length>0"
                >
                  <template v-slot:error>
                    <div v-for="err in $vuelidateForm.birthDate.$errors" :key="err.$uid">
                      {{ err?.$message }}
                    </div>
                  </template>

                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="cust.birthDate" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

              </div>
              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Status Pernikahan<span class="text-red">*</span></label>
                <q-select
                  clearable
                  outlined dense
                  v-model="cust.maritalStatus"
                  lazy-rules
                  :options="['KAWIN','BELUM KAWIN','CERAI HIDUP','CERAI MATI']"
                  @blur="$vuelidateForm.maritalStatus.$touch"
                  :error="$vuelidateForm.maritalStatus.$errors.length>0"
                >
                  <template v-slot:error>
                    <div v-for="err in $vuelidateForm.maritalStatus.$errors" :key="err.$uid">
                      {{ err?.$message }}
                    </div>
                  </template>
                </q-select>

              </div>
            </div>

            <div class="row q-my-lg">
              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Upload File KTP</label>
                <q-file outlined dense v-model="cust.ktpFilename" accept=".pdf">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>

              <div class="col-6 q-pr-md q-gutter-y-sm">
                <label class="q-my-sm">Upload File KK</label>
                <q-file outlined dense v-model="cust.kkFilename" accept=".pdf">
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

