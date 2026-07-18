import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirebaseConfig } from './config'

const app = initializeApp(getFirebaseConfig(import.meta.env))

export const auth = getAuth(app)
export const database = getDatabase(app)

export const login = () => signInAnonymously(auth)
export const logout = () => signOut(auth)

export const waitForUser = (): Promise<User> =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        login().then((credential) => resolve(credential.user))
      }
    })
  })
