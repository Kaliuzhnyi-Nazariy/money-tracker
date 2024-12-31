import { createRouter, createWebHistory } from 'vue-router'
import GreetingView from '@/views/GreetingView.vue'
import { useUserStore } from '@/stores/user'

const routes = [
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
  {
    path: '/renew',
    name: 'renewPassword',
    component: () => import('../views/ForgotPasswordForm.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // Access the user store
  const userStore = useUserStore()
  const { userToken } = userStore // Retrieve token state
  const { name } = to // Target route name

  // Ensure authentication flow is logical and avoids conflicting redirects
  if (
    !userToken &&
    name !== 'authorization' &&
    name !== 'forgotPassword' &&
    name !== 'greeting' &&
    name !== 'renewPassword'
  ) {
    // If not authenticated, redirect to the login page
    next({ name: 'authorization' })
  } else if (userToken && name === 'authorization') {
    // If authenticated, prevent access to the login page
    next({ name: 'dashboard' })
  } else {
    // Proceed to the intended route
    next()
  }
})
