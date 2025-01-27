<template>
  <nav
    class="flex justify-between py-5 bg-zinc-900 items-center align-middle lg:px-32 xl:px-[25rem]"
  >
    <div class="flex gap-2 items-center">
      <img src="../assets/brand.png" alt="brand" class="w-12" />
      <RouterLink to="/" class="text-white text-3xl font-extrabold"
        ><span class="text-green-500">G</span>ame<span class="text-green-500">S</span
        >helf</RouterLink
      >
    </div>

    <div class="flex gap-5 uppercase text-sm font-bold align-middle items-center">
      <div v-if="userStore.isLoggedIn" class="flex items-center gap-3">
        <RouterLink to="/user" class="hover:text-white">{{
          userStore.user?.displayName
        }}</RouterLink>
        <button @click="logout" class="text-sm font-bold hover:text-red-500">LOG OUT</button>
      </div>
      <Login v-else />
      <RouterLink to="/games" class="hover:text-white">Games</RouterLink>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userStore'
import Login from './Login.vue'

export default defineComponent({
  components: {
    Login,
  },
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
