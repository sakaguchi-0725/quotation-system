<script setup lang="ts">
type DialogWidth = 'sm' | 'md' | 'lg'

defineProps<{
  title?: string
  width?: DialogWidth
}>()

const modelValue = defineModel<boolean>({ default: false })

const widthClasses: Record<DialogWidth, string> = {
  sm: 'w-[320px]',
  md: 'w-[420px]',
  lg: 'w-[640px]',
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50"
    @click.self="modelValue = false"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4"
      :class="widthClasses[width ?? 'md']"
    >
      <div class="flex items-center justify-between">
        <div class="text-lg font-semibold text-slate-800">{{ title }}</div>
        <button
          class="text-slate-400 hover:text-slate-600"
          aria-label="閉じる"
          @click="modelValue = false"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="flex flex-col gap-4"><slot /></div>
      <div class="flex justify-end gap-2 mt-2"><slot name="footer" /></div>
    </div>
  </div>
</template>
