import type { RouteRecordRaw } from 'vue-router'
import { QuoteRateSettingsPage } from '@/pages/quote-rate-settings'
import { LayoutKey } from './route-meta'

export const quoteRateSettingsRoutes: RouteRecordRaw[] = [
  {
    path: '/settings/quote-rate',
    name: 'quote-rate-settings',
    component: QuoteRateSettingsPage,
    meta: { layout: LayoutKey.Private },
  },
]
