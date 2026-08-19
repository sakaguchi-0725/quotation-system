<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PrimaryButton, SecondaryButton } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog'
import { Table } from '@/shared/ui/table'
import { pageBreadcrumbKey } from '@/shared/lib/page-breadcrumb'

const props = defineProps<{
  dealId: string
  quoteId: string
}>()

const router = useRouter()
const dealName = '新基幹システム構築'

const breadcrumb = inject(pageBreadcrumbKey, ref([]))
breadcrumb.value = [
  { label: '商談管理', to: '/deals' },
  { label: dealName, to: `/deals/${dealName}` },
  { label: `見積もり ${props.quoteId}` },
]

const columns = [
  { key: 'name', label: '機能' },
  { key: 'effort', label: '工数（人月）' },
]
const features = [
  { name: '取引先登録・編集', effort: '0.5' },
  { name: '取引先検索', effort: '0.3' },
  { name: '商談一覧・検索', effort: '0.6' },
]
const totalEffort = features.reduce((sum, feature) => sum + Number(feature.effort), 0)
const totalAmount = Math.round(totalEffort * 900000)

const isPdfOpen = ref(false)

const revise = () => {
  router.push(`/deals/${dealName}/quotes/new`)
}
</script>

<template>
  <div class="max-w-2xl">
    <div class="flex items-center justify-between mb-2">
      <div class="text-2xl font-semibold text-slate-800">見積もり {{ props.quoteId }}</div>
      <div class="flex items-center gap-2">
        <PrimaryButton @click="isPdfOpen = true">PDF出力</PrimaryButton>
        <SecondaryButton @click="revise">改訂する</SecondaryButton>
      </div>
    </div>
    <div class="text-sm text-slate-500 mb-6">
      {{ dealName }} ／ 方式：ボトムアップ法 ／ 作成日：08/16
    </div>

    <div class="text-base font-semibold text-slate-800 mb-3">見積明細</div>
    <Table :columns="columns" :rows="features" />

    <div class="flex flex-col items-end gap-1 mt-6">
      <div class="text-sm text-slate-500">
        合計工数：{{ totalEffort.toFixed(1) }}人月　×　人月単価（マスタ設定）
      </div>
      <div class="text-2xl font-semibold text-slate-800">
        合計：¥{{ totalAmount.toLocaleString() }}
      </div>
    </div>
  </div>

  <Dialog v-model="isPdfOpen" :title="`見積書PDF（${props.quoteId}）`">
    <div
      class="h-72 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-mono"
      style="
        background: repeating-linear-gradient(
          135deg,
          #f8fafc,
          #f8fafc 10px,
          #eef1f5 10px,
          #eef1f5 20px
        );
      "
    >
      PDFプレビュー
    </div>
    <template #footer>
      <SecondaryButton @click="isPdfOpen = false">閉じる</SecondaryButton>
      <PrimaryButton>
        <i class="fa-solid fa-download text-xs"></i>
        ダウンロード
      </PrimaryButton>
    </template>
  </Dialog>
</template>
