<script setup>
import { ref } from 'vue'
import SidebarItems from 'components/SidebarItems.vue'
import {sidebarMenu} from 'layouts/sidebarItems.js'

defineOptions({
  name: 'MainLayout'
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>
        <q-toolbar-title>
          Manajemen Pengajuan
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <SidebarItems :menu="sidebarMenu" title="Menu"/>
    </q-drawer>

    <q-page-container class="q-px-xl">
      <router-view />
    </q-page-container>
  </q-layout>
</template>


