<template>
  <div class="container">

    <div class="d-flex">
      <RouterLink
        :to="{name: 'Home'}"
        class="d-block mb-3 home-link"
      >
        Home
      </RouterLink>
      <i class="bi bi-arrow-right-short px-2"></i>
      <p>{{ character.name }}</p>
    </div>

    <div v-if="loading" class="loading">
      Carregando...
    </div>

    <div v-else-if="error">
      Erro: {{ error.message }}
    </div>

    <div
      v-else-if="character"
      class="character-detail"
    >
      <div class="d-md-flex gap-3">
        <div class="text-center mb-3 mb-md-0">
          <img
            :src="character.image"
            :alt="character.name"
          >
        </div>

        <div class="details p-3">
          <h1 class="mb-3">{{ character.name }}</h1>
          <p><strong>Status:</strong> {{ character.status }}</p>
          <p><strong>Espécie:</strong> {{ character.species }}</p>
          <p><strong>Gênero:</strong> {{ character.gender }}</p>
          <p><strong>Origem:</strong> {{ character.origin?.name }}</p>
          <p><strong>Total de episódios:</strong> {{ character.episode?.length }}</p>
        </div>
      </div>

      <hr>

      <div class="episodes mt-4">
        <h2 class="mb-2">Episódios</h2>
        <ul>
          <li
            v-for="ep in character.episode"
            :key="ep.id"
            class="py-1"
          >
            {{ ep.episode }} - {{ ep.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GET_CHARACTER_BY_ID } from '@/api/queries'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

const props = defineProps({
  characterId:{
    type: Number,
    default: 0,
  }
})

const { result, loading, error } = useQuery(
  GET_CHARACTER_BY_ID,
  () => ({
    id: props.characterId
  }),
  { fetchPolicy: 'cache-and-network' }
)

const character = computed(() => result.value?.character || {})
</script>

<style scoped>
.home-link{
  color: var(--amarelo);
  text-decoration: underline;
}

.character-detail img {
  max-width: 250px;
  border: 1px solid var(--cinza);
}

.details{
  width: 100%;
  background-color: white;
  border: 1px solid var(--cinza);
}

.details h1, h2{
  font-family: 'Rick and Morty', sans-serif;
  text-shadow: 2px 2px 0px var(--ciano);
}
</style>
