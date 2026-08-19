import type { InjectionKey, Ref } from 'vue'

export type BreadcrumbItem = {
  label: string
  to?: string
}

export const pageBreadcrumbKey: InjectionKey<Ref<BreadcrumbItem[]>> = Symbol('page-breadcrumb')
