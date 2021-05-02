const functions = require('firebase-functions');

const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      admin: true,
    }
    try {
      var_ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
      return db.collection('users').doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims,
        profile: {
          name: '',
          lastName: '',
          birthDate: '',
          dni: '',
          email: authUser.email,
          cellphone: '',
          wsp: false,
          adress: ''
        },
        courses: ['pcom-latam-12'],
        coursesRequests: []
      })
    } catch (error) {
      console.log(error)
    }
  }
})


exports.setUserRole = functions.https.onCall(async (data, context) => {

  if (!context.auth.token.admin) return

  try {
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

    return db.collection("users").doc(data.uid).update({
      role: data.role
    })

  } catch (error) {
    console.log(error)
  }

});