import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebaseApp.auth()

const storage = firebaseApp.storage()

const functions = firebaseApp.functions()
export {db, auth, storage, functions}