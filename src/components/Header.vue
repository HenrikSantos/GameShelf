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
      <div v-if="user" class="flex items-center gap-3">
        <RouterLink to="/user" class="hover:text-white">{{ user.name }}</RouterLink>
        <button @click="logout" class="text-sm font-bold hover:text-red-500">LOGOUT</button>
      </div>
      <Login v-else @user-logged-in="handleUserLoggedIn" />
      <RouterLink to="/games" class="hover:text-white">Games</RouterLink>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'

export default {
  components: {
    Login,
  },
  data() {
    return {
      user: null,
    }
  },
  created() {
    this.checkUserLogin()
  },
  methods: {
    checkUserLogin() {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.user = JSON.parse(userData)
      }
    },
    handleUserLoggedIn(userData) {
      this.user = userData
    },
    logout() {
      localStorage.removeItem('user')
      this.user = null
      this.$router.push('/')
    },
  },
}
</script>
