<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Perfil do Usuário</h1>
    <div v-if="userStore.isLoggedIn" class="bg-zinc-800 p-6 rounded-lg">
      <div class="flex items-center gap-4 mb-4">
        <img :src="userStore.user?.photoURL" alt="Foto do usuário" class="w-16 h-16 rounded-full" />
        <div>
          <p class="text-lg font-semibold">{{ userStore.user?.displayName }}</p>
          <p class="text-sm text-zinc-400">{{ userStore.user?.email }}</p>
        </div>
      </div>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Log out
      </button>
    </div>
    <p v-else class="text-zinc-400">You are not logged in.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const userStore = useUserStore()

    const logout = async () => {
      await userStore.signOut()
    }

    return {
      userStore,
      logout,
    }
  },
})
</script>
