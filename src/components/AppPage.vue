<script setup>

import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

const props = defineProps({
  title: String,
  subtitle: String
})

const route = useRoute()

const breadCrumbs = computed(() => {

  let pathArray = route.path.split('/');
  pathArray.shift();
  return pathArray.reduce((breadcrumbsArray, path, index) => {
    breadcrumbsArray.push({
      path: path,
      to: breadcrumbsArray[index - 1]
        ? '/' + breadcrumbsArray[index - 1].path + '/' + path
        : '/' + path,
      name: route.matched[index]?.meta?.alias || path.charAt(0).toUpperCase() + path.slice(1)
    })
    return breadcrumbsArray;
  }, []);
})

</script>

<template>
  <div class="row q-pt-xl q-pa-lg items-center">

    <div class="col">
      <div class="row">
        <q-btn :ripple="false" unelevated color="primary" class="q-mr-md " icon="home"/>
        <div class="section-header">
          <h5 class="q-my-xs">{{props.title}}</h5>
          <p class="q-my-xs" style="color: gray">{{props.subtitle}}</p>
        </div>
      </div>
    </div>

    <div class="col-5">
      <q-breadcrumbs align="right">
        <q-breadcrumbs-el v-for="(item, index) in breadCrumbs" :key="index" :label="item.name"/>
      </q-breadcrumbs>
    </div>
  </div>

  <div class="q-px-lg">
    <slot></slot>
  </div>
</template>
