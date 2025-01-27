import { defineStore } from 'pinia'
import { auth } from '../firebase' // Importe o auth do Firebase
import { onAuthStateChanged } from 'firebase/auth'

interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
  }),
  persist: true,
  actions: {
    setUser(user: User | null) {
      this.user = user
      this.isLoggedIn = !!user
    },
    async checkAuthState() {
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.setUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          } else {
            this.setUser(null)
          }
          resolve()
        })
      })
    },
    async signOut() {
      try {
        await auth.signOut()
        this.setUser(null)
      } catch (error) {
        console.error('Error signing out:', error)
      }
    },
  },
})
