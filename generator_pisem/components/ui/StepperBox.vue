<template>
  <div 
    class="stepperWrapper" 
    :class="[
      effectiveOrientation === 'horizontal' ? 'stepperWrapper--horizontal' : 'stepperWrapper--vertical'
    ]"
  >
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="stepBlock"
      :class="[
        effectiveOrientation === 'horizontal' ? 'stepBlock--horizontal' : 'stepBlock--vertical'
      ]"
    >
      <div class="stepContent" :class="effectiveOrientation === 'horizontal' ? 'stepContent--horizontal' : 'stepContent--vertical'">
        <p 
          class="stepperCount"
          :class="step.completed ? 'stepperCount--active' : 'stepperCount--disabled'"
        >
          <svg v-if="step.completed" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="var(--color-white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-else>{{ index + 1 }}</span>
        </p>
        <p class="stepperLabel">{{ step.label }}</p>
      </div>

      <!-- Линия между шагами -->
      <div 
        v-if="index < steps.length - 1" 
        class="stepperLine"
        :class="[
          effectiveOrientation === 'horizontal' ? 'stepperLine--horizontal' : 'stepperLine--vertical',
          step.completed ? 'stepperLine--active' : 'stepperLine--disabled'
        ]"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepperComponent',
  props: {
    steps: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(step => 
          typeof step.label === 'string' && 
          typeof step.completed === 'boolean'
        )
      }
    },
    orientation: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    },
    mobileBreakpoint: {
      type: Number,
      default: 768 // ширина экрана в пикселях, при которой считается мобильным
    }
  },
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  computed: {
    // Определяем эффективную ориентацию с учетом ширины экрана
    effectiveOrientation() {
      // Если ширина экрана меньше мобильного брейкпоинта, всегда вертикальный
      if (this.windowWidth <= this.mobileBreakpoint) {
        return 'vertical'
      }
      // Иначе используем переданную ориентацию
      return this.orientation
    },
    isMobile() {
      return this.windowWidth <= this.mobileBreakpoint
    }
  },
  mounted() {
    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    // Убираем слушатель при уничтожении компонента
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style scoped>
/* Базовые стили */
.stepperCount--active {
    height: 24px;
    width: 24px;
    border-radius: 14px;
    background-color: var(--color-green);
    border: 1px solid var(--color-green);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    color: var(--color-white);
}

.stepperCount--disabled {
    height: 24px;
    width: 24px;
    border-radius: 14px;
    border: 1px solid var(--color-outline);
    color: var(--color-dark-grey);
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    background-color: transparent;
}

.stepperLabel {
    font-weight: 400;
    color: var(--color-dark-grey);
    font-size: 14px;
    margin: 0;
    white-space: nowrap;
}

/* Вертикальная ориентация */
.stepperWrapper--vertical {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.stepBlock--vertical {
    position: relative;
    display: flex;
    flex-direction: column;
}

.stepContent--vertical {
    display: flex;
    align-items: center;
    gap: 6px;
}

.stepperLine--vertical {
    width: 2px;
    height: 20px;
    background-color: var(--color-outline);
    position: absolute;
    bottom: -20px;
    left: 12px;
}

/* Горизонтальная ориентация */
.stepperWrapper--horizontal {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0;
}

.stepBlock--horizontal {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stepContent--horizontal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    z-index: 2;
    background: var(--color-white);
    padding: 0 10px;
    width: 40px;
}

.stepperLine--horizontal {
    position: absolute;
    top: 12px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: var(--color-outline);
    z-index: 1;
}

.stepBlock--horizontal:last-child .stepperLine--horizontal {
    display: none;
}

/* Состояния линий */
.stepperLine--active {
    background-color: var(--color-green);
}

.stepperLine--disabled {
    background-color: var(--color-outline);
}
</style>