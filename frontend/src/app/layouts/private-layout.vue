<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { pageBreadcrumbKey, type BreadcrumbItem } from '@/shared/lib/page-breadcrumb'

const route = useRoute()
const isActive = (prefix: string) => route.path.startsWith(prefix)

const breadcrumb = ref<BreadcrumbItem[]>([])
provide(pageBreadcrumbKey, breadcrumb)

const isLast = (index: number) => index === breadcrumb.value.length - 1
const currentLabelClass = () =>
  breadcrumb.value.length === 1
    ? 'text-lg font-semibold text-slate-800'
    : 'text-slate-800 font-medium'
</script>

<template>
  <div class="flex h-screen bg-slate-50">
    <aside class="w-16 bg-slate-900 flex flex-col items-center py-4 gap-1 shrink-0">
      <div
        class="w-9 h-9 rounded-lg bg-primary-500 text-white flex items-center justify-center text-base mb-4"
      >
        <i class="fa-solid fa-file-invoice-dollar"></i>
      </div>
      <button
        type="button"
        class="w-11 h-11 rounded-lg flex items-center justify-center text-slate-400"
        aria-label="ダッシュボード"
      >
        <i class="fa-solid fa-gauge text-lg"></i>
      </button>
      <RouterLink
        to="/customers"
        class="w-11 h-11 rounded-lg flex items-center justify-center"
        :class="
          isActive('/customers')
            ? 'bg-slate-800 text-primary-400'
            : 'text-slate-400 hover:bg-slate-800'
        "
        aria-label="取引先管理"
      >
        <i class="fa-solid fa-building text-lg"></i>
      </RouterLink>
      <RouterLink
        to="/deals"
        class="w-11 h-11 rounded-lg flex items-center justify-center"
        :class="
          isActive('/deals') ? 'bg-slate-800 text-primary-400' : 'text-slate-400 hover:bg-slate-800'
        "
        aria-label="商談管理"
      >
        <i class="fa-solid fa-handshake text-lg"></i>
      </RouterLink>
      <RouterLink
        to="/settings/quote-rate"
        class="w-11 h-11 rounded-lg flex items-center justify-center"
        :class="
          isActive('/settings')
            ? 'bg-slate-800 text-primary-400'
            : 'text-slate-400 hover:bg-slate-800'
        "
        aria-label="単価設定"
      >
        <i class="fa-solid fa-sliders text-lg"></i>
      </RouterLink>
      <div class="mt-auto">
        <button
          type="button"
          class="w-11 h-11 rounded-lg flex items-center justify-center text-slate-400"
          aria-label="設定"
        >
          <i class="fa-solid fa-gear text-lg"></i>
        </button>
      </div>
    </aside>
    <div class="flex-1 flex flex-col min-w-0">
      <header
        class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0"
      >
        <div class="flex items-center gap-2 text-sm">
          <template v-for="(item, index) in breadcrumb" :key="index">
            <RouterLink
              v-if="item.to && !isLast(index)"
              :to="item.to"
              class="text-slate-400 hover:text-slate-600"
            >
              {{ item.label }}
            </RouterLink>
            <span v-else :class="isLast(index) ? currentLabelClass() : 'text-slate-400'">
              {{ item.label }}
            </span>
            <i v-if="!isLast(index)" class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
          </template>
        </div>
        <div class="text-sm font-medium text-slate-800">山田 太郎</div>
      </header>
      <main class="flex-1 overflow-auto p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
