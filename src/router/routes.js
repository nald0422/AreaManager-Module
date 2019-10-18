
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/approvedApp', component: () => import('pages/ApprovedApp.vue')},
      { path: '/appByAge', component: () => import('pages/AppByAge.vue')},
      { path: '/sourceIncome', component: () => import('pages/SourceInc.vue')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
