<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  type: 'text' | 'email' | 'password'
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}>()

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-medium text-slate-500">{{ label }}</label>
    <input
      v-model="modelValue"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="h-10 rounded-lg border px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-slate-50 disabled:text-slate-400"
      :class="error ? 'border-danger-600' : 'border-slate-300'"
    />
    <span v-if="error" class="text-xs text-danger-600">{{ error }}</span>
  </div>
</template>
