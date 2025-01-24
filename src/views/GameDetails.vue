<script>
import axios from 'axios'

export default {
  name: 'GameDetails',
  data() {
    return {
      game: null,
    }
  },
  async created() {
    const gameId = this.$route.params.id
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
        params: {
          key: `${import.meta.env.VITE_API_KEY}`,
        },
      })
      this.game = response.data
    } catch (error) {
      console.error('Erro ao buscar o jogo:', error)
    }
  },
}
</script>

<template>
  <div v-if="game" class="lg:px-32 xl:px-[25rem]">
    <h1 class="text-3xl">{{ game.name }}</h1>
    <img class="h-32 float-start my-3 mr-8" :src="game.background_image" :alt="game.name" />
    <p>{{ game.description_raw }}</p>
    <p><strong>Rating:</strong> {{ game.rating }}</p>
    <p><strong>Released:</strong> {{ game.released }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
