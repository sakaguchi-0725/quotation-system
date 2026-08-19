import type { RouteRecordRaw } from 'vue-router'
import { CustomersPage } from '@/pages/customers'
import { CustomerDetailPage } from '@/pages/customer-detail'
import { LayoutKey } from './route-meta'

export const customersRoutes: RouteRecordRaw[] = [
  {
    path: '/customers',
    name: 'customers',
    component: CustomersPage,
    meta: { layout: LayoutKey.Private },
  },
  {
    path: '/customers/:customerId',
    name: 'customer-detail',
    component: CustomerDetailPage,
    props: true,
    meta: { layout: LayoutKey.Private },
  },
]
