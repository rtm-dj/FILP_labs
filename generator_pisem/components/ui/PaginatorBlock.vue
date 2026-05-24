<template>
  <div class="paginator">
    <button 
      class="paginator--prev" 
      :disabled="isFirstPage"
      @click="goToPrevPage"
      aria-label="Предыдущая страница"
    >
      &lt;
    </button>
    
    <template v-for="page in pages" :key="page">
      <button 
        v-if="page === '...'"
        class="paginator--ellipsis"
        disabled
      >
        ...
      </button>
      
      <button 
        v-else
        class="paginator--page"
        :class="{ 'paginator--page-active': page === currentPage }"
        @click="goToPage(page)"
        :aria-label="`Страница ${page}`"
        :aria-current="page === currentPage ? 'page' : null"
      >
        {{ page }}
      </button>
    </template>
    
    <button 
      class="paginator--next" 
      :disabled="isLastPage"
      @click="goToNextPage"
      aria-label="Следующая страница"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  
  props: {
    currentPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0
    },
    totalPages: {
      type: Number,
      required: true,
      validator: (value) => value > 0
    },
    visiblePages: {
      type: Number,
      default: 5,
      validator: (value) => value >= 3 && value <= 9
    }
  },
  
  emits: ['pageChange'],
  
  computed: {
    isFirstPage() {
      return this.currentPage === 1;
    },
    
    isLastPage() {
      return this.currentPage === this.totalPages;
    },
    
    pages() {
      const pages = [];
      const halfVisible = Math.floor(this.visiblePages / 2);
      
      let startPage = Math.max(1, this.currentPage - halfVisible);
      let endPage = Math.min(this.totalPages, startPage + this.visiblePages - 1);

      if (endPage - startPage + 1 < this.visiblePages) {
        startPage = Math.max(1, endPage - this.visiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) {
          pages.push('...');
        }
        pages.push(this.totalPages);
      }
      
      return pages;
    }
  },
  
  methods: {
    goToPage(page) {
      if (page !== this.currentPage && typeof page === 'number') {
        this.$emit('pageChange', page);
      }
    },
    
    goToPrevPage() {
      if (!this.isFirstPage) {
        this.goToPage(this.currentPage - 1);
      }
    },
    
    goToNextPage() {
      if (!this.isLastPage) {
        this.goToPage(this.currentPage + 1);
      }
    }
  }
}
</script>

<style scoped>
.paginator {
  width: fit-content;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.paginator button {
  background-color: transparent;
  border: 1px solid var(--color-outline);
  height: 32px;
  min-width: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s ease;
  padding: 0 4px;
}

.paginator button:hover:not(:disabled) {
  background-color: var(--color-background);
  border-color: var(--color-outline);
}

.paginator button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.paginator--page-active {
  background-color: var(--color-accent) !important;
  color: white !important;
  border-color: var(--color-accent) !important;
  font-weight: bold;
}

.paginator--ellipsis {
  border: none !important;
  background: transparent !important;
  cursor: default !important;
  min-width: 24px;
}
</style>