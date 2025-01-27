<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from './stores/userStore'
import Header from './components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
  },
  setup() {
    const userStore = useUserStore()

    userStore.checkAuthState()

    return {}
  },
})
</script>

<template>
  <Header />
  <RouterView />
</template>

<style>
body {
  margin: auto;
}
</style>
