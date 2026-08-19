import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { customersRoutes } from './customers'
import { dealsRoutes } from './deals'
import { quoteRateSettingsRoutes } from './quote-rate-settings'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/deals' },
  ...customersRoutes,
  ...dealsRoutes,
  ...quoteRateSettingsRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
