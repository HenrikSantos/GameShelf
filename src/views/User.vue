<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Perfil do Usuário</h1>
    <div v-if="user" class="bg-zinc-800 p-6 rounded-lg">
      <div class="flex items-center gap-4 mb-4">
        <img :src="user.profilePicture" alt="Foto do usuário" class="w-16 h-16 rounded-full" />
        <div>
          <p class="text-lg font-semibold">{{ user.name }}</p>
          <p class="text-sm text-zinc-400">{{ user.email }}</p>
        </div>
      </div>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Sair da Conta
      </button>
    </div>
    <p v-else class="text-zinc-400">Você não está logado.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  created() {
    this.checkUser()
  },
  methods: {
    checkUser() {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.user = JSON.parse(userData)
      } else {
        this.$router.push('/')
      }
    },
    logout() {
      localStorage.removeItem('user')
      // todo check why this is not working (does not update UI)
      // this.$emit('user-logged-in', null)
      this.$router.push('/')
    },
  },
}
</script>
