<script setup lang="ts" generic="TRow extends Record<string, unknown>">
import { computed } from 'vue'

type Column = {
  key: string
  label: string
  width?: string
}

const props = defineProps<{
  columns?: Column[]
  rows?: TRow[]
}>()

const columns = computed(() => props.columns ?? [])
const rows = computed(() => props.rows ?? [])

const rowKey = (row: TRow, index: number) => {
  const id = row.id
  return typeof id === 'string' || typeof id === 'number' ? id : index
}
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-slate-50 text-slate-500 text-xs uppercase">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="text-left font-medium px-5 py-3"
            :style="col.width ? { width: col.width } : undefined"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-for="(row, i) in rows" :key="rowKey(row, i)" class="hover:bg-slate-50">
          <td v-for="col in columns" :key="col.key" class="px-5 py-4 text-slate-700">
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length" class="px-5 py-8 text-center text-slate-400">
            データがありません
          </td>
        </tr>
      </tbody>
    </table>
    <slot name="footer" />
  </div>
</template>
