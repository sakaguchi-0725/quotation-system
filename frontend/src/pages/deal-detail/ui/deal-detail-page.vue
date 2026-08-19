<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PrimaryButton, SecondaryButton } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog'
import { Selectbox } from '@/shared/ui/selectbox'
import { Table } from '@/shared/ui/table'
import { pageBreadcrumbKey } from '@/shared/lib/page-breadcrumb'
import { QuoteStatus, QuoteStatusLabel, type Deal, type QuoteVersion } from '../model/types'

defineProps<{
  dealId: string
}>()

const router = useRouter()

const deal: Deal = {
  name: '新基幹システム構築',
  customer: 'サンプル商事',
  owner: '山田',
  registeredAt: '2025/06/01',
  status: QuoteStatus.Presenting,
}

const breadcrumb = inject(pageBreadcrumbKey, ref([]))
breadcrumb.value = [{ label: '商談管理', to: '/deals' }, { label: deal.name }]

const quoteVersions: QuoteVersion[] = [
  { id: 2, version: 'v2', amount: 5400000, createdAt: '08/10', isLatest: true },
  { id: 1, version: 'v1', amount: 4800000, createdAt: '07/20', isLatest: false },
]

const columns = [
  { key: 'version', label: 'Ver' },
  { key: 'amount', label: '金額' },
  { key: 'createdAt', label: '作成日' },
  { key: 'actions', label: '操作' },
  { key: 'detail', label: '' },
]

const rows = quoteVersions.map((quote) => ({
  ...quote,
  amount: `¥${quote.amount.toLocaleString()}`,
}))

const customerOptions = [{ value: deal.customer, label: deal.customer }]
const ownerOptions = [{ value: deal.owner, label: deal.owner }]
const statusOptions: { value: QuoteStatus; label: string }[] = [
  { value: QuoteStatus.Presenting, label: QuoteStatusLabel[QuoteStatus.Presenting] },
  { value: QuoteStatus.Won, label: QuoteStatusLabel[QuoteStatus.Won] },
  { value: QuoteStatus.Lost, label: QuoteStatusLabel[QuoteStatus.Lost] },
  { value: QuoteStatus.Revised, label: QuoteStatusLabel[QuoteStatus.Revised] },
]

const isEditOpen = ref(false)
const editCustomer = ref(deal.customer)
const editOwner = ref(deal.owner)
const editStatus = ref<QuoteStatus>(deal.status)

const isPdfOpen = ref(false)
const pdfVersion = ref('')

const openPdf = (version: string) => {
  pdfVersion.value = version
  isPdfOpen.value = true
}

const createNewQuote = () => {
  router.push(`/deals/${deal.name}/quotes/new`)
}
</script>

<template>
  <div class="flex items-start justify-between mb-8">
    <div>
      <div class="text-2xl font-semibold text-slate-800 mb-2">{{ deal.name }}</div>
      <div class="text-sm text-slate-500">
        取引先：{{ deal.customer }}　担当者：{{ deal.owner }}　登録日：{{ deal.registeredAt }}
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="px-3 py-1.5 rounded-full bg-warning-100 text-warning-700 text-sm font-medium">
        {{ QuoteStatusLabel[deal.status] }}
      </span>
      <SecondaryButton @click="isEditOpen = true">編集</SecondaryButton>
    </div>
  </div>

  <div class="flex items-center justify-between mb-4">
    <div class="text-base font-semibold text-slate-800">見積もり一覧</div>
    <PrimaryButton @click="createNewQuote">
      <i class="fa-solid fa-plus text-xs"></i>
      新規登録
    </PrimaryButton>
  </div>

  <Table :columns="columns" :rows="rows">
    <template #cell-actions="{ row }">
      <span
        class="text-primary-600 font-medium mr-4 cursor-pointer"
        @click="openPdf(typeof row.version === 'string' ? row.version : '')"
      >
        PDF出力
      </span>
      <RouterLink
        v-if="!row.isLatest"
        :to="`/deals/${deal.name}/quotes/new`"
        class="text-primary-600 font-medium"
      >
        改訂
      </RouterLink>
    </template>
    <template #cell-detail="{ row }">
      <RouterLink
        v-if="typeof row.version === 'string'"
        :to="`/deals/${deal.name}/quotes/${row.version}`"
        class="text-primary-600 font-medium"
      >
        詳細 <i class="fa-solid fa-chevron-right text-xs ml-1"></i>
      </RouterLink>
    </template>
  </Table>

  <Dialog v-model="isEditOpen" title="商談を編集" width="lg">
    <div class="flex flex-col gap-1.5 text-sm">
      <label class="text-xs font-medium text-slate-500">商談名</label>
      <div class="h-10 rounded-lg border border-slate-300 px-3 flex items-center whitespace-nowrap">
        {{ deal.name }}
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Selectbox v-model="editCustomer" label="取引先" :options="customerOptions" />
      <Selectbox v-model="editOwner" label="担当者" :options="ownerOptions" />
    </div>
    <Selectbox v-model="editStatus" label="ステータス" :options="statusOptions" />
    <template #footer>
      <SecondaryButton @click="isEditOpen = false">キャンセル</SecondaryButton>
      <PrimaryButton @click="isEditOpen = false">保存</PrimaryButton>
    </template>
  </Dialog>

  <Dialog v-model="isPdfOpen" :title="`見積書PDF（${pdfVersion}）`">
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
