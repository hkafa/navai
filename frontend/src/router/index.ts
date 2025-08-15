import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/pages/HomePage.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Home'
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/components/pages/WelcomePage.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Welcome to NavAI'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/pages/DashboardPage.vue'),
    meta: { 
      requiresAuth: true,
      title: 'Dashboard'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/pages/LoginPage.vue'),
    meta: { 
      requiresAuth: false,
      title: 'Login'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/pages/NotFoundPage.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const store = useAppStore()
  const isAuthenticated = store.isLoggedIn
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    store.setCurrentRoute(to.name as string)
    
    document.title = to.meta.title ? `${to.meta.title} | NavAI` : 'NavAI'
    
    next()
  }
})

export default router