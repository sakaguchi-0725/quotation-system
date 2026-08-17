<script setup lang="ts">
import BaseButton from './base-button.vue'

defineProps<{
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <BaseButton variant="secondary" :disabled="disabled" :type="type">
    <slot />
  </BaseButton>
</template>
