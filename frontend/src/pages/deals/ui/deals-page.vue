<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { PrimaryButton, SecondaryButton } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog'
import { TextInput } from '@/shared/ui/input'
import { Selectbox } from '@/shared/ui/selectbox'
import { Table } from '@/shared/ui/table'
import { pageBreadcrumbKey } from '@/shared/lib/page-breadcrumb'
import { DealStatus, DealStatusLabel, type Deal, type FilterKey } from '../model/types'

const breadcrumb = inject(pageBreadcrumbKey, ref([]))
breadcrumb.value = [{ label: '商談管理' }]

const deals: Deal[] = [
  {
    id: 1,
    name: '新基幹システム構築',
    customer: 'サンプル商事',
    owner: '山田',
    status: DealStatus.Presenting,
    updatedAt: '08/10',
  },
  {
    id: 2,
    name: 'Web改修案件',
    customer: 'アルファ',
    owner: '鈴木',
    status: DealStatus.Won,
    updatedAt: '08/02',
  },
  {
    id: 3,
    name: '在庫管理刷新',
    customer: 'ベータ工業',
    owner: '田中',
    status: DealStatus.NotCreated,
    updatedAt: '07/28',
  },
  {
    id: 4,
    name: 'CRM連携PoC',
    customer: 'ガンマ物産',
    owner: '佐藤',
    status: DealStatus.Lost,
    updatedAt: '07/15',
  },
]

const columns = [
  { key: 'name', label: '商談名' },
  { key: 'customer', label: '取引先' },
  { key: 'owner', label: '担当者' },
  { key: 'status', label: 'ステータス' },
  { key: 'updatedAt', label: '更新日' },
  { key: 'detail', label: '' },
]

const filters: FilterKey[] = [
  'all',
  DealStatus.NotCreated,
  DealStatus.Presenting,
  DealStatus.Won,
  DealStatus.Lost,
]
const filterLabel = (filter: FilterKey) => (filter === 'all' ? '全て' : DealStatusLabel[filter])
const selectedFilter = ref<FilterKey>('all')

const customerOptions = [...new Set(deals.map((deal) => deal.customer))].map((name) => ({
  value: name,
  label: name,
}))
const customerFilter = ref<string>('')

const statusClasses: Record<DealStatus, string> = {
  [DealStatus.NotCreated]: 'bg-slate-100 text-slate-500',
  [DealStatus.Presenting]: 'bg-warning-100 text-warning-700',
  [DealStatus.Won]: 'bg-success-100 text-success-700',
  [DealStatus.Lost]: 'bg-danger-100 text-danger-600',
}

const isDealStatus = (value: unknown): value is DealStatus =>
  typeof value === 'string' && value in statusClasses

const filteredDeals = computed(() =>
  deals.filter((deal) => {
    const matchesStatus = selectedFilter.value === 'all' || deal.status === selectedFilter.value
    const matchesCustomer = !customerFilter.value || deal.customer === customerFilter.value
    return matchesStatus && matchesCustomer
  }),
)

const isRegisterOpen = ref(false)
const newDealName = ref('')
const newDealCustomer = ref('')

const registerDeal = () => {
  isRegisterOpen.value = false
  newDealName.value = ''
  newDealCustomer.value = ''
}
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        class="px-3 py-1.5 rounded-full text-sm"
        :class="
          selectedFilter === filter
            ? 'bg-slate-900 text-white'
            : 'text-slate-500 hover:bg-slate-100'
        "
        @click="selectedFilter = filter"
      >
        {{ filterLabel(filter) }}
      </button>
      <div class="w-48 ml-2">
        <Selectbox
          v-model="customerFilter"
          :options="customerOptions"
          placeholder="取引先で絞込み"
        />
      </div>
    </div>
    <PrimaryButton @click="isRegisterOpen = true">
      <i class="fa-solid fa-plus text-xs"></i>
      新規登録
    </PrimaryButton>
  </div>

  <Table :columns="columns" :rows="filteredDeals">
    <template #cell-status="{ value }">
      <span
        class="px-2.5 py-1 rounded-full text-xs font-medium"
        :class="isDealStatus(value) ? statusClasses[value] : ''"
      >
        {{ isDealStatus(value) ? DealStatusLabel[value] : value }}
      </span>
    </template>
    <template #cell-detail="{ row }">
      <RouterLink :to="`/deals/${row.id}`" class="text-primary-600 font-medium">
        詳細 <i class="fa-solid fa-chevron-right text-xs ml-1"></i>
      </RouterLink>
    </template>
  </Table>

  <Dialog v-model="isRegisterOpen" title="商談を登録">
    <TextInput v-model="newDealName" label="商談名" placeholder="例）新基幹システム構築" />
    <Selectbox
      v-model="newDealCustomer"
      label="取引先"
      :options="customerOptions"
      placeholder="取引先を選択"
    />
    <template #footer>
      <SecondaryButton @click="isRegisterOpen = false">キャンセル</SecondaryButton>
      <PrimaryButton @click="registerDeal">保存</PrimaryButton>
    </template>
  </Dialog>
</template>
