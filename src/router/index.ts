import { createRouter, createWebHistory } from 'vue-router'
// import DashboardView from '@/views/DashboardView.vue'
import GreetingView from '@/views/GreetingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'greeting', component: GreetingView },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/forgot',
      name: 'forgotPassword',
      component: () => import('../views/ForgotPassword.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
