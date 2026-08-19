<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PrimaryButton, SecondaryButton } from '@/shared/ui/button'
import { TextInput } from '@/shared/ui/input'
import { Selectbox } from '@/shared/ui/selectbox'
import { Table } from '@/shared/ui/table'
import { pageBreadcrumbKey } from '@/shared/lib/page-breadcrumb'
import type { BottomUpFeature, Complexity, EstimateMethod, FpFeature, FpType } from '../model/types'

defineProps<{
  dealId: string
}>()

const router = useRouter()
const dealName = '新基幹システム構築'
const method = ref<EstimateMethod>('bottom-up')

const breadcrumb = inject(pageBreadcrumbKey, ref([]))
breadcrumb.value = [
  { label: '商談管理', to: '/deals' },
  { label: dealName, to: `/deals/${dealName}` },
  { label: '見積もり作成 (v3)' },
]

const unitPrice = 900000
const productivityFactor = 0.0625

const bottomUpColumns = [
  { key: 'name', label: '機能' },
  { key: 'effort', label: '工数（人月）', width: '8rem' },
  { key: 'delete', label: '', width: '4rem' },
]

let nextBottomUpId = 4
const bottomUpFeatures = ref<BottomUpFeature[]>([
  { id: 1, name: '取引先登録・編集', effort: '0.5' },
  { id: 2, name: '取引先検索', effort: '0.3' },
  { id: 3, name: '商談一覧・検索', effort: '0.6' },
])
const addBottomUpFeature = () => {
  bottomUpFeatures.value.push({ id: nextBottomUpId++, name: '', effort: '0' })
}
const removeBottomUpFeature = (id: number) => {
  bottomUpFeatures.value = bottomUpFeatures.value.filter((feature) => feature.id !== id)
}
const totalEffort = computed(() =>
  bottomUpFeatures.value.reduce((sum, feature) => sum + (Number(feature.effort) || 0), 0),
)
const totalAmountBottomUp = computed(() => Math.round(totalEffort.value * unitPrice))

const fpTypeOptions: { value: FpType; label: FpType }[] = [
  { value: 'EI', label: 'EI' },
  { value: 'EO', label: 'EO' },
  { value: 'EQ', label: 'EQ' },
  { value: 'ILF', label: 'ILF' },
  { value: 'EIF', label: 'EIF' },
]
const complexityOptions: { value: Complexity; label: Complexity }[] = [
  { value: '低', label: '低' },
  { value: '中', label: '中' },
  { value: '高', label: '高' },
]
const FP_TABLE: Record<FpType, Record<Complexity, number>> = {
  EI: { 低: 3, 中: 4, 高: 6 },
  EO: { 低: 4, 中: 5, 高: 7 },
  EQ: { 低: 3, 中: 4, 高: 6 },
  ILF: { 低: 7, 中: 10, 高: 15 },
  EIF: { 低: 5, 中: 7, 高: 10 },
}
const fpFor = (feature: FpFeature) => FP_TABLE[feature.type][feature.complexity]

const fpColumns = [
  { key: 'name', label: '機能' },
  { key: 'type', label: '機能種別', width: '8rem' },
  { key: 'complexity', label: '複雑度', width: '7rem' },
  { key: 'fp', label: 'FP数', width: '5rem' },
  { key: 'delete', label: '', width: '4rem' },
]

let nextFpId = 3
const fpFeatures = ref<FpFeature[]>([
  { id: 1, name: '取引先を登録する', type: 'EI', complexity: '中' },
  { id: 2, name: '商談を検索する', type: 'EQ', complexity: '低' },
])
const addFpFeature = () => {
  fpFeatures.value.push({ id: nextFpId++, name: '', type: 'EI', complexity: '低' })
}
const removeFpFeature = (id: number) => {
  fpFeatures.value = fpFeatures.value.filter((feature) => feature.id !== id)
}
const totalFp = computed(() => fpFeatures.value.reduce((sum, feature) => sum + fpFor(feature), 0))

const gscItems = [
  { label: '性能要件', score: 3 },
  { label: 'オンライン更新', score: 2 },
]
const gscAdjustment = 0.65 + gscItems.reduce((sum, item) => sum + item.score, 0) * 0.01
const totalAmountFp = computed(() =>
  Math.round(totalFp.value * productivityFactor * unitPrice * gscAdjustment),
)

const cancel = () => {
  router.push(`/deals/${dealName}`)
}
const save = () => {
  router.push(`/deals/${dealName}/quotes/v3`)
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="flex items-center gap-2 mb-2">
      <button
        type="button"
        class="px-4 py-2 rounded-lg text-sm font-medium"
        :class="method === 'bottom-up' ? 'bg-slate-900 text-white' : 'text-slate-500'"
        @click="method = 'bottom-up'"
      >
        ボトムアップ法
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-lg text-sm font-medium"
        :class="method === 'fp' ? 'bg-slate-900 text-white' : 'text-slate-500'"
        @click="method = 'fp'"
      >
        FP法
      </button>
    </div>

    <template v-if="method === 'bottom-up'">
      <div class="text-sm text-slate-500 mb-5">
        機能を洗い出し、各機能の工数（人月）を積み上げて算出します
      </div>
      <Table :columns="bottomUpColumns" :rows="bottomUpFeatures">
        <template #cell-name="{ row }">
          <TextInput v-model="row.name" placeholder="機能名" />
        </template>
        <template #cell-effort="{ row }">
          <TextInput v-model="row.effort" placeholder="0.0" />
        </template>
        <template #cell-delete="{ row }">
          <button
            type="button"
            class="text-danger-600 text-xs"
            @click="removeBottomUpFeature(row.id)"
          >
            削除
          </button>
        </template>
        <template #footer>
          <button
            type="button"
            class="w-full text-left px-5 py-3 text-primary-600 text-sm font-medium border-t border-slate-100"
            @click="addBottomUpFeature"
          >
            <i class="fa-solid fa-plus text-xs mr-1.5"></i>機能を追加
          </button>
        </template>
      </Table>
      <div class="flex flex-col items-end gap-1 mt-6">
        <div class="text-sm text-slate-500">
          合計工数：{{ totalEffort.toFixed(1) }}人月　×　人月単価（マスタ設定）
        </div>
        <div class="text-2xl font-semibold text-slate-800">
          合計：¥{{ totalAmountBottomUp.toLocaleString() }}
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-sm text-slate-500 mb-5">
        機能を追加し、機能種別・複雑度を指定してFP数を積み上げます
      </div>
      <Table :columns="fpColumns" :rows="fpFeatures">
        <template #cell-name="{ row }">
          <TextInput v-model="row.name" placeholder="機能名" />
        </template>
        <template #cell-type="{ row }">
          <Selectbox v-model="row.type" :options="fpTypeOptions" />
        </template>
        <template #cell-complexity="{ row }">
          <Selectbox v-model="row.complexity" :options="complexityOptions" />
        </template>
        <template #cell-fp="{ row }">
          {{ fpFor(row) }}
        </template>
        <template #cell-delete="{ row }">
          <button type="button" class="text-danger-600 text-xs" @click="removeFpFeature(row.id)">
            削除
          </button>
        </template>
        <template #footer>
          <button
            type="button"
            class="w-full text-left px-5 py-3 text-primary-600 text-sm font-medium border-t border-slate-100"
            @click="addFpFeature"
          >
            <i class="fa-solid fa-plus text-xs mr-1.5"></i>機能を追加
          </button>
          <div
            class="flex justify-between px-5 py-3 bg-slate-50 text-sm font-semibold text-slate-800 border-t border-slate-200"
          >
            <span>合計FP数</span><span>{{ totalFp }}</span>
          </div>
        </template>
      </Table>

      <div class="text-base font-semibold text-slate-800 mt-8 mb-3">
        GSC評価（システム全体・6項目、各0〜5点）
      </div>
      <div class="bg-white rounded-xl border border-slate-200 p-5 grid grid-cols-2 gap-3 text-sm">
        <div v-for="item in gscItems" :key="item.label" class="flex justify-between items-center">
          <span class="text-slate-600">{{ item.label }}</span>
          <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">{{
            item.score
          }}</span>
        </div>
        <div class="col-span-2 text-slate-400 text-xs">…残り4項目</div>
      </div>
      <div class="flex flex-col items-end gap-1 mt-6">
        <div class="text-2xl font-semibold text-slate-800">
          合計：¥{{ totalAmountFp.toLocaleString() }}
        </div>
      </div>
    </template>

    <div class="flex justify-end gap-2 mt-6">
      <SecondaryButton @click="cancel">キャンセル</SecondaryButton>
      <PrimaryButton @click="save">保存する</PrimaryButton>
    </div>
  </div>
</template>
