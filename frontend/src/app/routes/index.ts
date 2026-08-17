import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { HomePage } from '@/pages/home'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
