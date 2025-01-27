<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Game {
  id: number
  name: string
  background_image: string
  released: string
  rating: number
}

const games = ref<Game[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}`,
    )
    games.value = response.data.results.slice(0, 5)
  } catch (error) {
    console.error('Error fetching games:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="grid grid-cols-5 lg:px-32 xl:px-[25rem] gap-3 justify-between mt-5">
    <div v-if="!loading" v-for="game in games" :key="game.id" class="overflow-hidden">
      <RouterLink :to="`/games/${game.id}`" class="hover:text-white">
        <img :src="game.background_image" :alt="game.name" class="rounded shadow-2xl max-h-38" />
      </RouterLink>
    </div>
  </div>
</template>
