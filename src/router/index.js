import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  auth
} from '@/firebaseInit'

import Store from '../store/index'



// Views
import Home from '../views/Home.vue'
// import Init from '../views/Init.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Reset from '../views/Reset.vue'
// import EmptyCmp from '../components/Layouts/EmptyCmp.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Login,

},
{
  path: '*',
  component: () => import('../views/NotFoundComponent.vue')
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
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    guest: true
  }
},
{
  path: '/reset',
  name: 'Reset',
  component: Reset,
  meta: {
    guest: true
  }
},
{
  path: '/in',
  name: 'in',
  component: () => import('../components/Student/HomeStudent.vue'),
  // component: () => import('../components/Campus/In.vue'),
  meta: {
    auth: true
  },
  redirect: { name: 'in.home' },
  children: [
    {
      path: 'home',
      name: 'in.home',
      component: Home
    },
    {
      path: 'profile',
      name: 'in.profile',
      component: Profile
    },
    {
      path: 'cursos',
      name: 'cursos',
      component: () => import('../components/Campus/Courses.vue')
    },
    {
      path: ':courseID',
      name: 'in.course',
      // component: () => import('../components/Campus/Course/Course.vue'),
      component: () => import('../components/Student/Course.vue'),
      children: [
        {
          path: 'sessions',
          name: 'in.course.sessions',
          component: () => import('../components/Course/Sessions.vue'),
        },
        {
          path: ':sessionID',
          name: 'in.course.session',
          component: () => import('../components/Course/SessionIndividual.vue')
        },
        {
          path: 'qualifications',
          name: 'in.course.qualifications',
          // component: () => import('../components/Campus/Course/Notes.vue')
          component: () => import('../components/Student/Qualifications.vue')
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
  path: '/admin',
  component: () => import('../components/Share/EmptyCmp'),
  meta: {
    auth: true
  },
  redirect: {
    name: 'admin.home'
  },
  children: [
    {
      path: 'home',
      name: 'admin.home',
      component: () => import('../components/Admin/Home.vue')
    },
    {
      path: 'users',
      name: 'admin.users',
      component: () => import('../components/Share/EmptyCmp'), 
      // component: () => import('../components/Admin/Users/Edit.vue'),
      children: [
        {
          name: 'admin.users.create',
          path: 'create',
          component: () => import('../components/Admin/Users/Create.vue'),
        },
        {
          name: 'admin.users.update',
          path: 'update',
          component: () => import('../components/Admin/Users/Update.vue'),
        },
        {
          name: 'admin.users.read',
          path: 'read',
          component: () => import('../components/Admin/Users/Read.vue')
        },
        {
          name: 'admin.users.delete',
          path: 'delete',
          component: () => import('../components/Admin/Users/Delete.vue')
        }
      ]
    },
    {
      path: 'course',
      name: 'admin.course.create',
      component: () => import('../components/Admin/Admin.vue')
    },
    {
      path: 'register',
      name: 'admin.register',
      // component: () => import('../components/Admin/UserManagment/CreatePGP')
      component: () => import('../components/Admin/UserManagment/CreatePGP.vue')
    },
    {
      path: 'roll',
      name: 'admin.rollin',
      // component: ()=> import('../components/Admin/Enroll/EnrollOne.vue')
      component: ()=>import('../components/Admin/UserManagment/Bloque.vue')
    },
    {
      path: 'rescue',
      name: 'admin.rescue',
      component: ()=> import('../components/Admin/Rescue.vue')
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
  path: '/sessions',
  name: 'sessions',
  component: () => import('../components/Admin/Sessions.vue'),
  meta: {
    auth: true
  },
  children: [
    {
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
  children: [
    {
      path: '/enroll/request',
      name: 'enrollRequests',
      component: () => import('../components/Admin/Enroll/EnrollRequests.vue')
    },
    {
      path: '/enroll/one',
      name: 'enrollOne',
      component: () => import('../components/Admin/Enroll/EnrollOne.vue')
    },
    {
      path: '/enroll/delete',
      name: 'unEnroll',
      component: () => import('../components/Admin/Enroll/UnEnroll.vue')
    }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(userAuth => {
    if (userAuth) {
      Store.commit('SET_USER_UID', userAuth.uid)
      auth.currentUser.getIdTokenResult()
        .then(function ({ claims }) {
          if (claims.student) {
            Store.commit('SET_USER_CLAIM', 'student')
            if (to.path.includes('/in') == true) return next()
            else {
              return next({ path: '/in/home' })
            }
          } else if (claims.admin) {
            Store.commit('SET_USER_CLAIM', 'admin')
            if (to.path.includes('/admin') == true) return next()
            else {
              return next({ path: '/admin' })
            }
          } else if (claims.teacher) {
            Store.commit('SET_USER_CLAIM', 'teacher')
            if (to.path.includes('/teacher') == true) return next()
            else {
              return next({ path: '/teacher' })
            }
          }
        })
    } else {
      if (to.matched.some(record => record.meta.auth)) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    }
  })
})

export default router