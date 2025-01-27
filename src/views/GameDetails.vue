<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { db } from '../firebase'
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore'
import { useRoute } from 'vue-router'

interface Game {
  name: string
  background_image: string
  description_raw: string
  rating: number
  released: string
}

interface Comment {
  gameId: string
  comment: string
  timestamp: Timestamp
}

export default defineComponent({
  name: 'GameDetails',
  setup() {
    const game = ref<Game | null>(null)
    const comment = ref<string>('')
    const comments = ref<Comment[]>([])
    const route = useRoute()

    onMounted(() => {
      const gameId = route.params.id as string
      const commentsQuery = query(collection(db, 'comments'), orderBy('timestamp', 'desc'))

      onSnapshot(commentsQuery, (snapshot) => {
        comments.value = snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Comment, 'id'>
          return {
            ...data,
            id: doc.id,
          }
        }) as Comment[]
      })
    })

    const submitComment = async () => {
      if (!comment.value.trim()) {
        alert('Please enter a comment.')
        return
      }

      try {
        const gameId = route.params.id as string

        await addDoc(collection(db, 'comments'), {
          gameId,
          comment: comment.value,
          timestamp: Timestamp.now(),
        })

        alert('Comment submitted successfully!')
        comment.value = ''
      } catch (error) {
        console.error('Error submitting comment:', error)
        alert('Failed to submit comment.')
      }
    }

    const fetchGame = async () => {
      const gameId = route.params.id as string
      try {
        const response = await axios.get<Game>(`https://api.rawg.io/api/games/${gameId}`, {
          params: {
            key: `${import.meta.env.VITE_RAWG_API_KEY}`,
          },
        })
        game.value = response.data
      } catch (error) {
        console.error('Error fetching game:', error)
      }
    }

    onMounted(fetchGame)

    return {
      game,
      comment,
      comments,
      submitComment,
    }
  },
})
</script>

<template>
  <div v-if="game" class="lg:px-32 xl:px-[25rem]">
    <h1 class="text-3xl">{{ game.name }}</h1>
    <img class="h-32 float-start my-3 mr-8" :src="game.background_image" :alt="game.name" />
    <p>{{ game.description_raw }}</p>
    <p><strong>Rating:</strong> {{ game.rating }}</p>
    <p><strong>Released:</strong> {{ game.released }}</p>

    <!-- Comment input and submit button -->
    <div class="mt-4">
      <textarea
        v-model="comment"
        placeholder="Enter your comment..."
        class="w-full p-2 border rounded"
      ></textarea>
      <button @click="submitComment" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Submit Comment
      </button>
    </div>

    <!-- Display comments -->
    <div v-for="comment in comments" :key="comment.id">
      <p>{{ comment.comment }}</p>
      <small>{{ comment.timestamp.toDate().toLocaleString() }}</small>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
