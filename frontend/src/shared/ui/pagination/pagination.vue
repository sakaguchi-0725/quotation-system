<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pageCount?: number
}>()

const modelValue = defineModel<number>({ default: 1 })

const pageCount = computed(() => props.pageCount ?? 1)

const go = (page: number) => {
  if (page < 1 || page > pageCount.value || page === modelValue.value) return
  modelValue.value = page
}
</script>

<template>
  <nav
    class="flex justify-center items-center gap-1 text-sm text-slate-500"
    aria-label="pagination"
  >
    <button
      class="w-8 h-8 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
      :disabled="modelValue <= 1"
      aria-label="前のページ"
      @click="go(modelValue - 1)"
    >
      <i class="fa-solid fa-chevron-left text-xs"></i>
    </button>
    <button
      v-for="p in pageCount"
      :key="p"
      class="w-8 h-8 rounded-lg font-medium"
      :class="p === modelValue ? 'bg-primary-600 text-white' : 'hover:bg-slate-100'"
      :aria-current="p === modelValue ? 'page' : undefined"
      @click="go(p)"
    >
      {{ p }}
    </button>
    <button
      class="w-8 h-8 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
      :disabled="modelValue >= pageCount"
      aria-label="次のページ"
      @click="go(modelValue + 1)"
    >
      <i class="fa-solid fa-chevron-right text-xs"></i>
    </button>
  </nav>
</template>
