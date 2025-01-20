import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GoogleSignInPlugin from 'vue3-google-login'

const app = createApp(App)

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!clientId) {
  console.error('Google Client ID não configurado corretamente.')
}

app.use(GoogleSignInPlugin, {
  clientId,
})

app.use(router)

app.mount('#app')
