import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import UnauthorizeView from '../views/UnauthorizeView.vue'
import NotFound from '../views/NotFoundView.vue'
import Register from '../components/Register.vue'
import OpportuinitiesView from '../views/OpportuinitiesView.vue'
import { isAuthenticate, getUserRole } from '@/lib/helper'

const authenticated = isAuthenticate()
const userRole = getUserRole()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/opportunities',
      name: 'OpportunitiesView',
      component: OpportuinitiesView,
    },
    {
      path: '/valid-opportunities',
      name: 'ValidOpportunitiesView',
      component: OpportuinitiesView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/admin/create-opportunity',
      name: 'CreateOpportunity',
      component: () => import('../views/CreateOpportunityView.vue'),
    },
    {
      path: '/admin/edit-opportunity',
      name: 'EditOpportunity',
      component: () => import('../views/EditOpportunityView.vue'),
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizeView.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('../views/AdminDashboard.vue'),
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

// router.beforeEach(async (to, from) => {
//   if (!authenticated && to.name == 'create-opportunity') {
//     return { name: 'admin-login' }
//   }
//   if (userRole !== 'admin' && to.name == 'create-opportunity') {
//     return { name: 'unauthorized' }
//   }
// })

router.beforeEach(async (to, from) => {
  if (authenticated && (to.name == 'register' || to.name == 'login')) {
    return { name: 'home' }
  }
})

export default router
