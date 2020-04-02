export default {
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
          console.log(error.message)
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
        router.push('/in')
      })
      .catch((error) => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error.message)
      })
  },

  signUserOut({
    commit
  }) {
    auth.signOut().then(function () {
      console.log('Se ha salido de la sesisón')
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
      } else {
        console.log('No hay usuario registrado')
      }
    }).catch((error) => {
      console.log('Error obteniendo el documento: ', error)
    })
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
        console.log("Document successfully updated!");
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
      timestamp: new Date().toISOString()
    })
  },
  setAllCoursesID({
    commit
  }) {
    let data = []
    db.collection("courses").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        data.push(doc.id)
      });
    });
    console.log(data)
    commit('setAllCourses', data)
  },

  setSessionsCourseA({
    commit
  }, payload) {
    commit('clearSessionsCourse')
    let data = []
    db.collection('courses').doc(payload).collection('sessions').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        data.push(doc.data())
      });
    });
    commit('setSessionsCourse', data)
  },

  setCourseInfo({
    commit
  }, payload) {
    db.collection('courses').doc(payload).get().then(function (doc) {
      if (doc.exists) {
        commit('setCourseInfo', doc.data())
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
}