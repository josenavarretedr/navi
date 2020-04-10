import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import {
  auth,
  db
} from '../firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userUID: null,
    user: null,
    loading: false,
    error: null,
    allCoursesID: null,
    courseInfo: null,
    sessionsCourse: null,
    sessionsCourseID: null,
    allCoursesData: null
  },
  mutations: {
    setUserUID(state, payload) {
      state.userUID = payload
    },
    setUser(state, payload) {
      state.user = payload
    },

    setAllCoursesID(state, payload) {
      state.allCoursesID = payload
    },

    setAllCoursesData(state, payload){
      state.allCoursesData = payload
    },

    setSessionsCourse(state, payload) {
      state.sessionsCourse = payload
    },

    setSessionsCourseID(state,payload){
      state.sessionsCourseID = payload
    },


    setLoading(state, payload) {
      state.loading = payload
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

    signUserIn({
      commit
    }, payload) {

      commit('setLoading', true)
      commit('clearError')
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(function () {
          commit('setLoading', false)
          router.push('/')
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },

    signUserOut({
      commit
    }) {
      auth.signOut().then(function () {
        commit('setUser', null)
      })
    },


    // GET user information by database/{user.uid}

    getUserInfo({
      commit
    }, uid) {
      db.collection('users').doc(uid).get().then((doc) => {
        if (doc.exists) {
          commit('setUser', doc.data())
        }
      })
      // .catch((error) => {
      //   console.log('Error obteniendo el documento: ', error)
      // })
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

      courseRef.collection('sessions').doc(`S${payload.session}`).set({
        sessionName: payload.sessionName,
        nameFile: payload.nameFile,
        url: payload.url,
        note: 1,
        timestamp: new Date().toISOString().substr(0, 10)
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
      commit('setAllCoursesData',data)      
    },


    setSessionsCourse({
      commit
    }, payload) {
      commit('clearSessionsCourse')
      let sessionsID=[]
      let data = []
      db.collection('courses').doc(payload).collection('sessions').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          sessionsID.push(doc.id)
          data.push(doc.data())
        });
      });
      commit('setSessionsCourseID',sessionsID)
      commit('setSessionsCourse', data)
    },
  },





  getters: {
    allCoursesID(state) {
      return state.allCoursesID
    },

    allCoursesData(state){
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

    getSessionsCourse(state) {
      return state.sessionsCourse
    },

    getSessionsCourseID(state){
      return state.sessionsCourseID
    }

  }
})