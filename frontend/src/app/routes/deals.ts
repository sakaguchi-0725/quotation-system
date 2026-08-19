import type { RouteRecordRaw } from 'vue-router'
import { DealsPage } from '@/pages/deals'
import { DealDetailPage } from '@/pages/deal-detail'
import { QuoteCreatePage } from '@/pages/quote-create'
import { QuoteDetailPage } from '@/pages/quote-detail'
import { LayoutKey } from './route-meta'

export const dealsRoutes: RouteRecordRaw[] = [
  { path: '/deals', name: 'deals', component: DealsPage, meta: { layout: LayoutKey.Private } },
  {
    path: '/deals/:dealId',
    name: 'deal-detail',
    component: DealDetailPage,
    props: true,
    meta: { layout: LayoutKey.Private },
  },
  {
    path: '/deals/:dealId/quotes/new',
    name: 'quote-create',
    component: QuoteCreatePage,
    props: true,
    meta: { layout: LayoutKey.Private },
  },
  {
    path: '/deals/:dealId/quotes/:quoteId',
    name: 'quote-detail',
    component: QuoteDetailPage,
    props: true,
    meta: { layout: LayoutKey.Private },
  },
]
