import { createRouter, createWebHistory } from 'vue-router'
import ExcelView from './views/ExcelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'excel',
      component: ExcelView
    }
  ]
})

export default router
