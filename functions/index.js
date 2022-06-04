const functions = require('firebase-functions');

const admin = require('firebase-admin');
const { user } = require('firebase-functions/lib/providers/auth');

admin.initializeApp()

const db = admin.firestore()
const auth = admin.auth()

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      student: true,
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
        courses: [],
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

exports.gettingUidUser = functions.https.onCall(async (data,context) => {
  if(!context.auth.token.admin) return
  try {
    data.userEmailsToCreate.forEach((userEmail) => {
      let userRecord = await auth.getUserByEmail(userEmail.email)
      let userRecordData = userRecord.toJSON()
      let userUid = userRecordData.uid

    })
  } catch (error) {
    throw new functions.https.HttpsError('problem', error)
  }
})

exports.rollCourses = functions.https.onCall(async (data, context) => {
  if (!context.auth.token.admin) return
  if (!data.userInUse.length===0) return
  try {
    // Obteniendo el uid del usuario
    let userRecord = await auth.getUserByEmail(data.userInUse)
    let userRecordData = userRecord.toJSON()
    let userUID = userRecordData.uid
    // Recopilando la data (query in Storage)
    let userDbFirebase = await db.collection('users').doc(userUID).get()
    let userData = userDbFirebase.data()
    // Data from the course
    let courseDbFirebase = await db.collection('courses').doc(data.courseToRoll).get()
    let courseData = courseDbFirebase.data()
    let courseDataStudents = courseData.students === null ? [] : courseData.students
    courseDataStudents.push(userUID)

    if(!userData.courses.includes(data.courseToRoll) || userData.courses.length === 0){
      userData.courses.push(data.courseToRoll)
      // Update user data
      db.collection('users').doc(userUID).update({
        courses : userData.courses
      })
      // Update course data
      db.collection('courses').doc(data.courseToRoll).update({
        students: courseDataStudents
      })
      return {userUIDRolled: userUID, msj : `Se matriculó en el curso ${data.courseToRoll}`}
    } else {
      return {userUIDRolled: userUID, msj : 'Ya estaba registrado'}
    }

  } catch (error) {
    throw new functions.https.HttpsError('problem', error)
  }
  // auth.getUserByEmail(data.userInUse)
  // .then((userRecord) => {
  //   console.log(userRecord.toJSON())
  // }).catch((error) => {
  //   throw new functions.https.HttpsError('problem', error)
  // })
})