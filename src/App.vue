<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import GamesList from './components/GamesList.vue'
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
