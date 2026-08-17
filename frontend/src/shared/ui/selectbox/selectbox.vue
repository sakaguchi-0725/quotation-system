<script setup lang="ts">
type SelectOption = {
  value: string | number
  label: string
}

defineProps<{
  label?: string
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
}>()

const modelValue = defineModel<string | number>({ default: '' })

const onChange = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    modelValue.value = event.target.value
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-medium text-slate-500">{{ label }}</label>
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        class="w-full h-10 rounded-lg border border-slate-300 pl-3 pr-8 text-sm text-slate-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-slate-50 disabled:text-slate-400"
        @change="onChange"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options ?? []" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <i
        class="fa-solid fa-chevron-down text-xs text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      ></i>
    </div>
  </div>
</template>
