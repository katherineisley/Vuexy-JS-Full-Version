const emailRouteComponent = () => import('@/pages/apps/email/index.vue')

// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      const userData = useCookie('userData')
      const userRole = userData.value?.role
      if (userRole === 'admin')
        return { name: 'dashboard' } // This will be your guild selection page
      if (userRole === 'client')
        return { name: 'access-control' }
      
      return { name: 'login', query: to.query }
    },
  },
  {
    path: '/pages/user-profile',
    name: 'pages-user-profile',
    redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
  },




]


export const routes = [

  
  // Guild dashboard routes
  {
    path: '/dashboard/:guild/home',
    name: 'guild-dashboard-home',
    component: () => import('@/pages/dashboard/[guild]/home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/:guild/welcome',
    name: 'guild-dashboard-welcome',
    component: () => import('@/pages/dashboard/[guild]/welcome.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/:guild/tickets',
    name: 'guild-dashboard-tickets',
    component: () => import('@/pages/dashboard/[guild]/tickets.vue'),
    meta: {
      requiresAuth: true,
    },
  },


  // Redirect guild root to home
  {
    path: '/dashboard/:guild',
    redirect: to => ({ name: 'guild-dashboard-home', params: to.params }),
  },
]
