import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/collections',
      name: 'collections',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/authUI.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/profileUI.vue')
    }
  ]
})
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = localStorage.getItem('token') || null
    if (token) {
      return next()
    } else {
      return next({ name: 'login', replace: true })
    }
  }
  return next()
})

export default router
