import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAPsDm2L-mDBZp0QGuBd46v44nUGhHJyEk',
    authDomain: 'posters-app-3eb45.firebaseapp.com',
    databaseURL: 'https://posters-app-3eb45-default-rtdb.firebaseio.com',
    projectId: 'posters-app-3eb45',
    storageBucket: 'posters-app-3eb45.appspot.com',
    messagingSenderId: '1094745950527',
    appId: '1:1094745950527:web:9e8a56be1fbb9af4c8eb8a',
    measurementId: 'G-78DQCY7PCT',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                unsubscribe()
                resolve(user)
            },
            reject
        )
    })
}

const datareal = getDatabase(app)
export { getCurrentUser, auth, db, datareal }
