<script setup lang="ts">
import BaseInput from './base-input.vue'

defineProps<{
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}>()

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <BaseInput
    v-model="modelValue"
    type="text"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :error="error"
  />
</template>
