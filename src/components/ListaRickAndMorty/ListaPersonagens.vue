<template>
  <div class="page">
    <div v-if="loading" class="loading">
      Carregando...
    </div>

    <div v-else-if="error" class="error">
      Erro: {{ error.message }}
    </div>

    <div
      v-else
    >
      <div>
        <ListaPesquisa
          @search="handleSearch"
          :loading="loading"
        />
        <div
          v-if="!loading && !error && characters.length === 0"
          class="no-results"
        >
          Nenhum personagem encontrado para "{{ searchFilter }}"
        </div>
      </div>

      <ListaPaginacao
        v-if="!loading && !error && pageInfo.pages > 1"
        :current-page="currentPage"
        :total-pages="pageInfo.pages"
        @page-change="handlePageChange"
      />

      <div class="lista d-sm-grid justify-content-center m-0 g-3 gx-3">
        <RouterLink
          v-for="character in characters"
          :key="character.id"
          class="card w-sm-100 col-sm-12 col-md-6 py-3"
          :to="{
            name: 'Personagem',
            params: { characterId: character.id }
          }"
        >
          <h2
            class="pt-1 text-center"
          >
            {{ character.name }}
          </h2>
          <img
            :src="character.image"
            :alt="character.name"
            class="p-2 m-4"
          >
          <div class="px-3">
            <p
              :class="{
              'alive': character.status === 'Alive',
              'dead': character.status === 'Dead',
              'unknown': character.status === 'unknown'
              }"
            >
              {{ character.status }}
            </p>

            <p
              :class="{
              'human': character.species === 'Human',
              'animal': character.species === 'Animal',
              'alien': character.species === 'Alien',
              'unknown': character.species === 'unknown'
              }"
            >{{ character.species }}</p>

            <p
              :class="{
              'female': character.gender === 'Female',
              'male': character.gender === 'Male',
              'unknown': character.gender === 'unknown'
              }"
            >{{ character.gender }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GET_CHARACTERS } from '@/api/queries'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

import ListaPaginacao from './ListaPaginacao.vue'
import ListaPesquisa from './ListaPesquisa.vue'

const currentPage = ref(1)
const searchFilter = ref('')

function handleSearch(query) {
  searchFilter.value = query
  currentPage.value = 1
}

const { result, loading, error } = useQuery(
  GET_CHARACTERS,
  () => ({
    page: currentPage.value,
    filter: searchFilter.value ? { name: searchFilter.value } : null
  }),
  { fetchPolicy: 'cache-and-network' }
)

const characters = computed(() => result.value?.characters?.results || [])
const pageInfo = computed(() => result.value?.characters?.info || { pages: 1 })

function handlePageChange(page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.lista{
  grid-template-columns: auto auto auto auto;
}

@media screen and (max-width: 992px) {
  .lista{
    grid-template-columns: auto auto auto;
  }
}

.card{
  width: 98%;
  margin: 5px;
  cursor: pointer;
}

.card h2{
  font-size: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Rick and Morty', sans-serif;
  text-shadow: 2px 2px 0px var(--ciano);
}

.card img {
  border-radius: 100%;
  border: 1px solid var(--cinza);
}

.card p{
  font-size: 1.2rem;
}

.alive::before, .dead::before, .human::before, .alien::before,
.male::before, .female::before, .unknown::before{
  width: 10px;
}

.alive::before{
  content: '🥳';
}

.dead::before{
  content: '💀';
}

.animal::before{
  content: '🐰';
}

.human::before{
  content: '🧑‍🦰';
}

.alien::before{
  content: '👽';
}

.male::before{
  content: '🚹';
}

.female::before{
  content: '🚺';
}

.unknown::before{
  content: '❓';
}

.card:hover{
  padding: 5%;
}
</style>
