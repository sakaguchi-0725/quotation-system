<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'danger'

defineProps<{
  variant: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
  danger: 'bg-danger-600 text-white hover:bg-red-700',
}
</script>

<template>
  <button
    :type="type ?? 'button'"
    :disabled="disabled"
    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    :class="variantClasses[variant]"
  >
    <slot />
  </button>
</template>
