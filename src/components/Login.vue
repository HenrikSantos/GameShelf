<template>
  <div>
    <button
      v-if="!userStore.isLoggedIn"
      @click="signInWithGoogle"
      class="text-sm font-bold hover:text-white"
    >
      LOGIN WITH GOOGLE
    </button>
    <div v-else class="flex gap-3 items-center">
      <p>{{ userStore.user?.displayName }}!</p>
      <button @click="signOut" class="text-sm font-bold hover:text-white">LOGOUT</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { auth, googleProvider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  name: 'GoogleLogin',
  setup() {
    const userStore = useUserStore()

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        userStore.setUser({
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        })
        console.log('Google Sign-In successful:', result.user)
      } catch (error) {
        console.error('Error signing in with Google:', error)
      }
    }

    const signOut = async () => {
      await userStore.signOut()
    }

    return {
      userStore,
      signInWithGoogle,
      signOut,
    }
  },
})
</script>
