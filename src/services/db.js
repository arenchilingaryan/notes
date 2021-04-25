import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA72-3JrpbHZUcyP3FfqwBOxHxT6gquIEk",
    authDomain: "notes-7a240.firebaseapp.com",
    projectId: "notes-7a240",
    storageBucket: "notes-7a240.appspot.com",
    messagingSenderId: "672792702326",
    appId: "1:672792702326:web:b484094ebde408a8d75e57"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig).firestore()