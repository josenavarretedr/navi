import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { v4 as uuidv4 } from 'uuid';
import student from './modules/student'

import {
  auth,
  db
} from '../firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'init-layout',
    userClaim: 'student',
    userUID: null,
    user: null,
    loading: false,
    endVar: false,
    error: null,
    allCoursesID: null,
    courseInfo: null,
    sessionsCourse: null,
    sessionsCourseID: null,
    allCoursesData: null,
    courseID: null,
    studentHomeworkDone: [],
  },
  mutations: {
    SET_LAYOUT(state, newLayout) {
      state.layout = newLayout
    },
    SET_USER_CLAIM(state, n) {
      state.userClaim = n
    },
    SET_USER_UID(state, payload) {
      state.userUID = payload
    },
    setUser(state, payload) {
      state.user = payload
    },

    setAllCoursesID(state, payload) {
      state.allCoursesID = payload
    },

    setAllCoursesData(state, payload) {
      state.allCoursesData = payload
    },

    setSessionsCourse(state, payload) {
      state.sessionsCourse = payload
    },

    setSessionsCourseID(state, payload) {
      state.sessionsCourseID = payload
    },

    setCourseID(state, payload) {
      state.courseID = payload
    },

    setStudentHomeworkDone(state, payload) {
      state.studentHomeworkDone = payload
    },


    setLoading(state, payload) {
      state.loading = payload
    },
    setEndVar(state, payload) {
      state.endVar = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    clearSessionsCourse(state) {
      state.sessionsCourse = null
    }
  },
  actions: {
    // Get User UID
    setUserUIDA({
      commit,
      dispatch
    }, uid) {
      commit('setUserUID', uid)
      dispatch('getUserInfo', uid)
    },
    // Actions of auth
    signUserUp({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(function () {
          commit('setLoading', false)
          auth.signOut()
          router.push('/login')
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },

    async signUserIn({ commit }, payload) {
      try {
        commit('setLoading', true)
        commit('clearError')
        let login = await auth.signInWithEmailAndPassword(payload.email, payload.password)
        console.log(login.uid)
        commit('setLoading', false)
        commit('SET_LAYOUT', 'principal-layout')
        router.push('/in')
      }
      catch (error) {
        commit('setLoading', false)
        commit('setError', error)
      }
    },

    sendPasswordReset({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')

      auth.sendPasswordResetEmail(payload.email)
        .then(function () {
          commit('setLoading', false)
          alert(`Se ha enviado un correo electrónico a ${payload.email} para realizar el reseteo de tu contraseña.`)
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },

    async signUserOut({
      commit
    }) {
      await auth.signOut()
      commit('setUser', null)
      commit('setUserUID', null)
      commit('SET_LAYOUT', 'init-layout')
    },

    // Set gloabl variables
    clearError({
      commit
    }) {
      commit('clearError')
    },

    // Guardar datos del '/Profile', actualiza Firabase y modifica el valor de user.profile local

    updateProfile({
      commit,
      getters,
      dispatch
    }, payload) {
      commit('setEndVar', false)
      commit('setLoading', true)
      db.collection('users').doc(getters.userID)
        .update({
          'profile.name': payload.name,
          'profile.lastName': payload.lastName,
          'profile.dni': payload.dni,
          'profile.birthDate': payload.birthDate,
          'profile.email': payload.email,
          'profile.cellphone': payload.cellphone,
          'profile.wsp': payload.wsp,
          'profile.adress': payload.adress
        }).then(function () {
          dispatch('getUserInfo', getters.userID)
          commit('setEndVar', true)
          commit('setLoading', false)
        })
    },

    sessionRegister({
      getters
    }, payload) {
      let courseRef = db.collection('users').doc(getters.userID).collection('courses').doc(payload.course)

      courseRef.set({
        loading: true
      })

      const sessionUID = uuidv4()

      courseRef.collection('sessions').doc(`${payload.session}`).set({
        sessionUID: sessionUID,
        sessionName: payload.sessionName,
        sessionIDCourse: payload.session,
        nameFile: payload.nameFile,
        url: payload.url,
        note: 1,
        created: new Date().getTime()
      })

      // TODO hacer que se registre también el la base de datos de los cursos.
    },
    // This actions get id of courses and call to commit to setAllCoursesData 
    setAllCoursesID({
      commit
    }) {
      let data = []
      let dataid = []
      db.collection("courses").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          dataid.push(doc.id)
          data.push(doc.data())
        });
      });
      commit('setAllCoursesID', dataid)
      commit('setAllCoursesData', data)
    },


    setSessionsCourse({
      commit
    }, payload) {
      commit('clearSessionsCourse')
      let sessionsID = []
      let data = []
      db.collection('courses').doc(payload).collection('sessions').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          sessionsID.push(doc.id)
          data.push(doc.data())
        });
      });
      commit('setSessionsCourseID', sessionsID)
      commit('setSessionsCourse', data)
    },

    setCourseID({ state, commit, dispatch }, payload) {
      state.courseID = null
      commit('setCourseID', payload)
      dispatch('setStudentHomeworkDone')
    },

    setStudentHomeworkDone({ commit, getters }) {
      let homeWorks = []
      db.collection('users').doc(getters.userID).collection('courses').doc(getters.getCourseID).collection('sessions').get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            homeWorks.push(doc.data())
          });
        });
      console.log(homeWorks)
      commit('setStudentHomeworkDone', homeWorks)
    }
  },





  getters: {
    allCoursesID(state) {
      return state.allCoursesID
    },

    allCoursesData(state) {
      return state.allCoursesData
    },

    coursesIn(state) {
      return state.allCoursesID.filter((course) => {
        if (state.user.course === null) {
          return null
        } else {
          return state.user.courses.includes(course)
        }
      })
    },

    getCoursesRequest(state) {
      return state.user.coursesRequest
    },

    getCoursesRequests(state) {
      return state.user.coursesRequests
    },

    getOneCourse: (state) => (id) => {
      return state.allCoursesData.filter((course) => {
        return (course.id) == id
      })
    },

    userID(state) {
      return state.userUID
    },
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    },

    endVar(state) {
      return state.endVar
    },

    getSessionsCourse(state) {
      return state.sessionsCourse.sort((a, b) => a.created - b.created)
    },

    getSessionsCourseID(state) {
      return state.sessionsCourseID
    },

    getCourseID(state) {
      return state.courseID
    },

    getStudentHomeworkDone(state) {
      return state.studentHomeworkDone
    }
  },
  modules:{
    student
  }
})