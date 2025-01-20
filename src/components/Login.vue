<template>
  <div>
    <button v-if="!showGoogleLogin" @click="toggleLogin" class="text-sm font-bold hover:text-white">
      LOGIN
    </button>
    <GoogleLogin v-else :callback="callback" />
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'

export default {
  data() {
    return {
      showGoogleLogin: false,
    }
  },
  methods: {
    callback(response) {
      console.log('Resposta do Google:', response)

      if (response && response.credential) {
        const decodedToken = jwtDecode(response.credential)
        console.log('Token decodificado:', decodedToken)

        const userData = {
          name: decodedToken.name,
          firstName: decodedToken.given_name,
          email: decodedToken.email,
          profilePicture: decodedToken.picture,
        }

        localStorage.setItem('user', JSON.stringify(userData))
        this.$emit('user-logged-in', userData)
        this.$router.push('/')
      } else {
        console.error('Resposta do Google inválida:', response)
      }
    },
    toggleLogin() {
      this.showGoogleLogin = !this.showGoogleLogin
    },
  },
}
</script>
