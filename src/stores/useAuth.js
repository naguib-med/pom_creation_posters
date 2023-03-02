import { defineStore } from 'pinia'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'

import router from '../router/index'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        user: {
            register: 0,
            id: null,
        },
        email: '',
        password: '',
        repassword: '',
        showPassReg: false,
        showPassLog: false,
        valid: true,
        validLog: true,
        loading: false,
        snackbar: false,
        dialog: false,
        userID: null,
        verifEmailAlert: false,
        firstRegister: false,
    }),

    getters: {
        getUser: () => this.state.user,
        getEmail: () => this.state.email,
        getPassword: () => this.state.password,

        getFirstRegister(state) {
            return state.firstRegister
        },
    },

    actions: {
        setFirstRegister(val) {
            this.firstRegister = val
        },
        async register() {
            await createUserWithEmailAndPassword(
                getAuth(),
                this.email,
                this.password
            )
                .then((data) => {
                    const user = data.user
                    console.log(user)
                    console.log(data)
                    console.log('Successfully registered!')
                    const auth = getAuth()
                    this.user.id = user.uid
                    if (this.user.id) {
                        if (this.user.register === 0) {
                            this.user.register = 1
                        }
                    }
                    sendEmailVerification(auth.currentUser).then(() => {
                        window.alert(
                            'Lien de vérification envoyé à votre adresse e-mail. Veuillez consulter vos courriels pour valider votre adresse, puis vous pourrez vous reconnecter.'
                        )
                    })
                })
                .catch((err) => alert(err.message))
        },

        async signOut() {
            await signOut(getAuth())
                .then(() => {
                    this.loading = false
                    this.isLoggedIn = false
                    router.push({ path: '/' })
                    router.go(0)
                })
                .catch((err) => alert(err.message))
        },

        async validate() {
            await signInWithEmailAndPassword(
                getAuth(),
                this.email,
                this.password
            )
                .then(() => {
                    const auth = getAuth()
                    if (auth.currentUser.emailVerified) {
                        this.loading = true
                        this.firstRegister = false
                        setTimeout(() => {
                            this.isLoggedIn = true
                            router.push('/home')
                            this.snackbar = true
                        }, 3000)
                    } else {
                        this.verifEmailAlert = true
                    }
                    if (this.user.register === 1) {
                        this.firstRegister = true
                    }
                })
                .catch((err) => alert(err.message))
        },

        async googleLogin() {
            let provider = new GoogleAuthProvider()
            await signInWithPopup(getAuth(), provider)
                .then(() => {
                    router.push('/home')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        async reset_password() {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    console.log('mot de passe réinitialiser')
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode)
                    console.log(errorMessage)
                })
        },
    },
})
