import {
  db
} from '@/firebaseInit'

export default {
  namespaced: true,
  state: {
    courses: [],
    data: null,
  },
  mutations: {
    SET_STUDENT_DATA(state, payload) {
      state.data = payload
    },
    SET_STUDENT_COURSES(state, payload){
      state.courses = payload
    }
  },
  actions: {
    async studentData({ commit, rootState }) {
      let userData = await db.collection('users').doc(rootState.userUID).get()
      commit('SET_STUDENT_DATA', userData.data())

    },
    async studentsCourses({commit, rootState}) {
      let coursesEnrolled = await db.collection('courses').where("students", "array-contains-any", [rootState.userUID]).get()
      let coursesData = []
      coursesEnrolled.forEach((courseEnrolled) =>{
        // TODO ver si se puede aplicar class constructor
        const a = {}
        a.id = courseEnrolled.id
        a.data = courseEnrolled.data()
        coursesData.push(a)
      })
      commit('SET_STUDENT_COURSES',coursesData)
    }
  },
}