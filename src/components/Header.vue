<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav
    class="flex justify-between p-3 bg-zinc-900 items-center align-middle lg:px-32 xl:px-[32rem]"
  >
    <RouterLink to="/" class="text-white text-3xl font-extrabold"
      ><span class="text-green-500">G</span>ame<span class="text-green-500">S</span>helf</RouterLink
    >

    <div class="flex gap-5 uppercase text-sm font-bold">
      <RouterLink to="/signin" class="hover:text-white">Sign In</RouterLink>
      <RouterLink to="/register" class="hover:text-white">Create Account</RouterLink>
      <RouterLink to="/games" class="hover:text-white">Games</RouterLink>
    </div>
  </nav>
</template>
