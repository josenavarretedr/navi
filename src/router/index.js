import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  auth
} from '@/firebaseInit'


// Views
// 
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    // component: Login,
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: '*',
    component: () => import('../views/NotFoundComponent.vue')
  },
  {
    path: '/in',
    component: () => import('../components/Campus/In.vue'),
    meta: {
      auth: true
    },
    children: [{
        name: 'courses',
        path: '',
        component: () => import('../components/Campus/Courses.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'cursos',
        name: 'cursos',
        component: () => import('../components/Campus/Courses.vue')
      },
      {
        path: ':id',
        name: 'individual',
        component: () => import('../components/Campus/Course/Course.vue'),
        children: [{
            path: '',
            component: () => import('../components/Campus/Course/Sessions.vue')
          },
          {
            path: 'notes',
            component: () => import('../components/Campus/Course/Notes.vue')
          },
          {
            path: 'sesiones',
            component: () => import('../components/Campus/Course/Sessions.vue')
          },
          {
            path: 'cronograma',
            component: () => import('../components/Campus/Course/Cronogram.vue')
          },
          {
            path: 'info',
            component: () => import('../components/Campus/Course/Info.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/courses',
    name: 'allCourses',
    component: Home,
    meta: {
      guest: true
    },
  },
  {
    path: '/courses/:id',
    name: 'landing',
    component: () => import('../components/Landing/Landing.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/Admin/Admin.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: () => import('../components/Admin/Sessions.vue'),
    meta: {
      auth: true
    },
    children: [{
        path: '',
        name: 'sessionDefault',
        component: () => import('../components/Admin/SessionsDefault.vue')
      },
      {
        path: '/sessions/:id',
        name: 'sessionsCourse',
        component: () => import('../components/Admin/SessionsCourse.vue')
      }
    ]
  },
  {
    path: '/enroll',
    name: 'enroll',
    component: () => import('../components/Admin/Enroll/Enroll.vue'),
    meta: {
      auth: true
    },
    children: [{
      path: '/enroll/request',
      name: 'enrollRequests',
      component: () => import ('../components/Admin/Enroll/EnrollRequests.vue')
    },
    {
      path:'/enroll/one',
      name: 'enrollOne',
      component: () => import('../components/Admin/Enroll/EnrollOne.vue')
    },
    {
      path: '/enroll/delete',
      name: 'unEnroll',
      component: () => import( '../components/Admin/Enroll/UnEnroll.vue')
    }
  ]
  },
  {
    path: '/check',
    name: 'check',
    component: () => import('../components/Admin/Check.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../components/Test/Test.vue'),
    meta: {
      auth: true
    },
    children: [{
        path: 'hijo',
        component: () => import('../components/Test/Hijo.vue')
      },
      {
        path: 'hija',
        component: () => import('../components/Test/Hija.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// FIXME funciona bien pero si alguien está logeado y digita '/in' lo manda al login.

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.auth)
  if (requiresAuth && !await auth.currentUser) {
    next('/')
  } else {
    next()
  }
});


// Intento fallido de implementar path to admin
// router.beforeEach((to,from, next) => {
//   auth.onAuthStateChanged(userAuth => {
//     if(userAuth){
//       auth.currentUser.getIdTokenResult()
//       .then(function({claims}){
//         if (claims.student){
//           if(to.path !== '/in')
//             return next({
//               path:'/in'
//             })
//         } else if (claims.admin){
//           if(to.path !== '/admin')
//             return next({
//               path:'/admin'
//             })
//         }
//       })
//     } else {
//       if(to.matched.some(record => record.meta.auth)){
//         next({
//           path: '/login',
//           query:{
//             redirect: to.fullPath
//           }
//         })
//       } else {
//         next()
//       }
//     }
//   })
// })

export default router