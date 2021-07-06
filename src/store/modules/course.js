
import { db } from "../../firebaseInit"

export default{
  namespaced: true,
  state: {
    nombre: 'Hola desde modules',
    sessions: [],
  },
  mutations: {
    SET_SESSIONS(state, payload){
      state.sessions = payload
    }
  },
  actions: {
    async getSessionsDB({commit},payload){
      commit('setLoading', true, { root: true })
      commit('SET_SESSIONS', [])
      const sessions = await db.collection('courses').doc(payload).collection('sessions').get()
      const sessionToPush = []
      sessions.forEach((session) => {
        sessionToPush.push(session.data())
      });
      commit('SET_SESSIONS', sessionToPush)
      commit('setLoading', false, { root: true })

    }
  },
  getters: {
    getSortedSessions(state){
      return state.sessions.sort((a,b)=> new Date(b.created) - new Date(a.created))
    },
    getOneSession: (state) => (id) => {
      return state.sessions.find(session => session.id===id)
       
    }
  }
}