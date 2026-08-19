<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { PrimaryButton, SecondaryButton } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog'
import { TextInput } from '@/shared/ui/input'
import { Pagination } from '@/shared/ui/pagination'
import { Table } from '@/shared/ui/table'
import { pageBreadcrumbKey } from '@/shared/lib/page-breadcrumb'
import { CustomerStatus, CustomerStatusLabel, type Customer } from '../model/types'

const breadcrumb = inject(pageBreadcrumbKey, ref([]))
breadcrumb.value = [{ label: '取引先管理' }]

const customers: Customer[] = [
  {
    id: 1,
    name: '株式会社サンプル商事',
    contact: 'tanaka@example.com',
    registeredAt: '2025/04/01',
    status: CustomerStatus.Active,
  },
  {
    id: 2,
    name: '合同会社アルファ',
    contact: 'sato@example.com',
    registeredAt: '2025/02/14',
    status: CustomerStatus.Closed,
  },
  {
    id: 3,
    name: 'ベータ工業株式会社',
    contact: 'tanaka2@example.com',
    registeredAt: '2025/01/22',
    status: CustomerStatus.Active,
  },
]

const columns = [
  { key: 'name', label: '取引先名' },
  { key: 'contact', label: '連絡先' },
  { key: 'registeredAt', label: '登録日' },
  { key: 'status', label: '状態' },
  { key: 'detail', label: '' },
]

const searchQuery = ref('')
const currentPage = ref(1)
const isRegisterOpen = ref(false)
const newCustomerName = ref('')
const newCustomerEmail = ref('')

const filteredCustomers = computed(() =>
  customers.filter((customer) => customer.name.includes(searchQuery.value)),
)

const isCustomerStatus = (value: unknown): value is CustomerStatus =>
  typeof value === 'string' && value in CustomerStatusLabel

const registerCustomer = () => {
  isRegisterOpen.value = false
  newCustomerName.value = ''
  newCustomerEmail.value = ''
}
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <div class="w-80">
      <TextInput v-model="searchQuery" placeholder="取引先名で検索…" />
    </div>
    <PrimaryButton @click="isRegisterOpen = true">
      <i class="fa-solid fa-plus text-xs"></i>
      新規登録
    </PrimaryButton>
  </div>

  <Table :columns="columns" :rows="filteredCustomers">
    <template #cell-status="{ value }">
      <span
        class="px-2.5 py-1 rounded-full text-xs font-medium"
        :class="
          isCustomerStatus(value) && value === CustomerStatus.Active
            ? 'bg-success-100 text-success-700'
            : 'bg-slate-100 text-slate-500'
        "
      >
        {{ isCustomerStatus(value) ? CustomerStatusLabel[value] : value }}
      </span>
    </template>
    <template #cell-detail="{ row }">
      <RouterLink :to="`/customers/${row.id}`" class="text-primary-600 font-medium">
        詳細 <i class="fa-solid fa-chevron-right text-xs ml-1"></i>
      </RouterLink>
    </template>
  </Table>

  <div class="mt-6">
    <Pagination v-model="currentPage" :page-count="3" />
  </div>

  <Dialog v-model="isRegisterOpen" title="取引先を登録">
    <TextInput v-model="newCustomerName" label="取引先名" placeholder="例）株式会社サンプル商事" />
    <TextInput
      v-model="newCustomerEmail"
      label="連絡先（メールアドレス）"
      placeholder="例）tanaka@example.com"
    />
    <template #footer>
      <SecondaryButton @click="isRegisterOpen = false">キャンセル</SecondaryButton>
      <PrimaryButton @click="registerCustomer">保存</PrimaryButton>
    </template>
  </Dialog>
</template>
