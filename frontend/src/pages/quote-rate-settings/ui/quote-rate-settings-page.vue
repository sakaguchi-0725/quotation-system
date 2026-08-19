<script setup lang="ts">
import { inject, ref } from 'vue'
import { PrimaryButton, SecondaryButton } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog'
import { TextInput } from '@/shared/ui/input'
import { pageBreadcrumbKey } from '@/shared/lib/page-breadcrumb'

const breadcrumb = inject(pageBreadcrumbKey, ref([]))
breadcrumb.value = [{ label: '見積もり単価設定' }]

const unitPrice = ref('900,000')
const productivityFactor = ref('0.0625')

const isEditOpen = ref(false)
const draftUnitPrice = ref(unitPrice.value)
const draftProductivityFactor = ref(productivityFactor.value)

const openEdit = () => {
  draftUnitPrice.value = unitPrice.value
  draftProductivityFactor.value = productivityFactor.value
  isEditOpen.value = true
}
const save = () => {
  unitPrice.value = draftUnitPrice.value
  productivityFactor.value = draftProductivityFactor.value
  isEditOpen.value = false
}
</script>

<template>
  <div class="max-w-md bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div>
        <div class="text-xs font-medium text-slate-500 mb-1">人月単価（円）</div>
        <div class="text-lg text-slate-800">{{ unitPrice }}</div>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <div class="text-xs font-medium text-slate-500 mb-1">生産性係数（人月／FP）</div>
        <div class="text-lg text-slate-800">{{ productivityFactor }}</div>
      </div>
    </div>
    <div class="flex justify-end">
      <SecondaryButton @click="openEdit">編集</SecondaryButton>
    </div>
  </div>

  <Dialog v-model="isEditOpen" title="見積もり単価設定">
    <TextInput v-model="draftUnitPrice" label="人月単価（円）" />
    <TextInput v-model="draftProductivityFactor" label="生産性係数（人月／FP）" />
    <template #footer>
      <SecondaryButton @click="isEditOpen = false">キャンセル</SecondaryButton>
      <PrimaryButton @click="save">保存</PrimaryButton>
    </template>
  </Dialog>
</template>
