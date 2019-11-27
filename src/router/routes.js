
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    // component: () => import('layouts/MyLayout.vue'),
    children: [
        { path: '', component: () => import('layouts/Login.vue') },
        { path: '/dashboard', component: () => import('layouts/MyLayout.vue'), 
            children:[
                { path: '', component: () => import('pages/index.vue') },
                { path: '/approvedApp', component: () => import('pages/ApprovedApp.vue')},
                { path: '/appByAge', component: () => import('pages/AppByAge.vue')},
                { path: '/sourceIncome', component: () => import('pages/SourceInc.vue')},
                { path: '/playground', component: () => import('pages/Playground.vue')}
            ]
        },   
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
