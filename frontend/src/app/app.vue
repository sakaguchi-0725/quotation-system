<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { layoutComponents } from './layouts'

const route = useRoute()
const layout = computed(() => {
  const key = route.meta.layout
  return key ? layoutComponents[key] : null
})
</script>

<template>
  <component :is="layout" v-if="layout" />
  <RouterView v-else />
</template>
