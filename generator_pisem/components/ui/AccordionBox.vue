<template>
  <div class="accordion-section" :class="{ 'accordion-section--open': isOpen }">
    <div class="accordion-header" @click="toggle">
      <slot name="header">
        <div class="accordion-header-default">
            <span class="accordion-icon" :style="isOpen ? 'transform: rotate(90deg);' : 'transform: rotate(0deg);'">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="var(--color-light-grey)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <span class="accordion-title">{{ title }}</span>
        </div>
      </slot>   
    </div>

    <div v-show="isOpen" class="accordion-content">
      <slot name="content">
        <div class="accordion-content-default">
          Контент по умолчанию
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionSection',
  props: {
    open: {
        type: Boolean,
        default: false
    },
    title:{
        type: String,
        default: 'Название раздела'
    },
  },
  emits: ['update:open', 'toggle'],
  data() {
    return {
      isOpen: this.open
    }
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
      this.$emit('update:open', this.isOpen)
      this.$emit('toggle', this.isOpen)
    }
  }
}
</script>

<style scoped>

.accordion-header {
  cursor: pointer;
  user-select: none;
}

.accordion-header-default {
  display: flex;
  gap: 10px;
  align-items: center;
}

.accordion-title {
  font-weight: 500;
  font-size: 20px;
  color: #111827;
}

.accordion-icon {
  background-color: var(--color-background);
  height: 22px;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 20px;
}
.accordion-content{
    padding: 16px 0;
    padding-left: 48px;
}
.accordion-content-default {
  padding: 16px;
  color: #4b5563;
}
@media (max-width: 768px){
  .accordion-content{
      padding: 16px 0;
      padding-left: 0;
  }
}
</style>