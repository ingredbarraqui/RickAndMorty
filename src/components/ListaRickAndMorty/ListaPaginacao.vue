<template>
  <div class="pagination d-flex gap-1 justify-content-center justify-content-md-end">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button"
      aria-label="Página anterior"
    >
      &laquo;
    </button>

    <template v-for="page in visiblePages" :key="page">
      <button
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
        class="pagination-button"
      >
        {{ page }}
      </button>
    </template>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-button"
      aria-label="Próxima página"
    >
      &raquo;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisibleButtons: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['page-change'])

function goToPage(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisibleButtons / 2)
  let start = Math.max(props.currentPage - half, 1)
  const end = Math.min(start + props.maxVisibleButtons - 1, props.totalPages)

  start = Math.max(end - props.maxVisibleButtons + 1, 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

</script>

<style scoped>
.pagination-button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #e1e1e1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button.active {
  background-color: var(--ciano);
  color: white;
  border-color: var(--ciano);
}
</style>
