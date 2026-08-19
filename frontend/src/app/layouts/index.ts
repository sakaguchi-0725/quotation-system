import type { Component } from 'vue'
import PrivateLayout from './private-layout.vue'
import { LayoutKey } from '@/app/routes/route-meta'

export const layoutComponents: Record<LayoutKey, Component> = {
  [LayoutKey.Private]: PrivateLayout,
}
