<script setup lang="ts">
import { inject, ref } from 'vue'
import { Table } from '@/shared/ui/table'
import { pageBreadcrumbKey } from '@/shared/lib/page-breadcrumb'
import {
  CustomerStatus,
  CustomerStatusLabel,
  DealStatus,
  DealStatusLabel,
  type Customer,
  type Deal,
} from '../model/types'

defineProps<{
  customerId: string
}>()

const customer: Customer = {
  name: '株式会社サンプル商事',
  contact: 'tanaka@example.com',
  registeredAt: '2025/04/01',
  status: CustomerStatus.Active,
}

const breadcrumb = inject(pageBreadcrumbKey, ref([]))
breadcrumb.value = [{ label: '取引先管理', to: '/customers' }, { label: customer.name }]

const dealColumns = [
  { key: 'name', label: '商談名' },
  { key: 'owner', label: '担当者' },
  { key: 'status', label: 'ステータス' },
  { key: 'updatedAt', label: '更新日' },
  { key: 'detail', label: '' },
]
const deals: Deal[] = [
  {
    id: 1,
    name: '新基幹システム構築',
    owner: '山田',
    status: DealStatus.Presenting,
    updatedAt: '08/10',
  },
]

const statusClasses: Record<DealStatus, string> = {
  [DealStatus.NotCreated]: 'bg-slate-100 text-slate-500',
  [DealStatus.Presenting]: 'bg-warning-100 text-warning-700',
  [DealStatus.Won]: 'bg-success-100 text-success-700',
  [DealStatus.Lost]: 'bg-danger-100 text-danger-600',
}

const isDealStatus = (value: unknown): value is DealStatus =>
  typeof value === 'string' && value in statusClasses
</script>

<template>
  <div class="flex items-start justify-between mb-8">
    <div>
      <div class="text-2xl font-semibold text-slate-800 mb-2">{{ customer.name }}</div>
      <div class="text-sm text-slate-500">
        連絡先：{{ customer.contact }}　登録日：{{ customer.registeredAt }}
      </div>
    </div>
    <span
      class="px-3 py-1.5 rounded-full text-sm font-medium"
      :class="
        customer.status === CustomerStatus.Active
          ? 'bg-success-100 text-success-700'
          : 'bg-slate-100 text-slate-500'
      "
    >
      {{ CustomerStatusLabel[customer.status] }}
    </span>
  </div>

  <div class="text-base font-semibold text-slate-800 mb-4">商談一覧</div>
  <Table :columns="dealColumns" :rows="deals">
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
</template>
