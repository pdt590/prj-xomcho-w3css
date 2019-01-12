import firebase from 'firebase'

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase