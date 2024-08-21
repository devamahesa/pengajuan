<script setup>
import AppPage from "components/AppPage.vue";

defineOptions({
  name: 'IndexPage'
});
</script>


<template>
  <AppPage title="Home" subtitle="Halaman Utama">
    <template v-slot:default>
      <div class="flex flex-center">
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-vertical.svg"
          style="width: 200px; height: 200px"
        >
      </div>
    </template>

  </AppPage>
</template>


