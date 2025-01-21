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
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}`,
    )
    console.log(games)
    games.value = response.data.results
  } catch (error) {
    console.error('Error fetching games:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="lg:px-32 xl:px-[25rem] gap-3 justify-between mt-5">
    <div v-if="!loading" v-for="game in games" :key="game.id">
      <div class="w-full flex gap-3">
        <img
          :src="game.background_image"
          :alt="game.name"
          class="rounded shadow-2xl max-h-32 max-w-28 object-cover"
        />
        <div>
          <h1 class="text-white">
            <span class="font-bold">{{ game.name }}</span>
            {{}}
            <span class="font-thin text-gray-400">{{ game.released.slice(0, 4) }}</span>
          </h1>
        </div>
      </div>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full" />
    </div>
  </div>
</template>
