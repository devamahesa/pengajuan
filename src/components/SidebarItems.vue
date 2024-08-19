<template>
  <q-item-label header>
    {{props.title}}
  </q-item-label>

  <q-list>
    <div v-for="(item, index) in props.menu" :key="index">

      <q-expansion-item
        :label="item.name"
        :icon="item.icon"
        v-if="item.children && item.children.length > 0"
      >
        <q-list v-for="(child,childIdx) in item.children" :key="childIdx">
          <q-item v-ripple clickable :to="{name: child.to}" style="padding-left: 15%">
            <q-item-section avatar>
              <q-icon :name="child.icon"/>
            </q-item-section>
            <q-item-section>{{ child.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <q-item v-else v-ripple clickable :to="{name: item.to} ">
        <q-item-section avatar>
          <q-icon :name="item.icon"/>
        </q-item-section>
        <q-item-section>{{ item.name }}</q-item-section>
      </q-item>
    </div>
  </q-list>
</template>

<script setup>
defineOptions({
  name: 'SidebarItems'
})

const props = defineProps({
  menu: Array,
  title: {
    type: String,
    default: ''
  }
})

</script>
