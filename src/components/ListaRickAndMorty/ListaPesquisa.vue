<template>
  <div class="d-flex justify-content-center my-3">
    <input
      v-model="searchQuery"
      @keyup.enter="handleManualSearch"
      :disabled="loading"
      placeholder="Buscar personagem..."
      class="search-input"
    >
    <button
      @click="handleManualSearch"
      :disabled="loading"
      class="search-button"
    >
      Buscar
    </button>
  </div>
</template>

<script setup>
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  loading: Boolean
})

const emit = defineEmits(['search'])

const searchQuery = ref('')
let searchTimeout = null

watch(searchQuery, (newVal) => {
  clearTimeout(searchTimeout)
  if (newVal.trim()) {
    searchTimeout = setTimeout(() => {
      emit('search', newVal)
    }, 600)
  }
})

function handleManualSearch() {
  clearTimeout(searchTimeout)
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
  }
}

onUnmounted(() => {
  clearTimeout(searchTimeout)
})
</script>

<style scoped>
.search-input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid var(--bs-border-color-translucent);;
  border-radius: 4px 0 0 4px;
}

.search-button {
  padding: 0 1rem;
  color: var(--ciano);
  border: 1px solid var(--cinza);
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
</style>
