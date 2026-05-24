<template>
  <button
    @mouseenter="show = true" @mouseleave="show = false"
    class="outline"
    :disabled="disabled"
    :style="buttonStyle"
  >
    <img :style="{'fill': color, 'width': '12px'}" :src="iconUrl" alt="label" loading="eager">
    <transition name="fade-tooltip" v-if="label">
      <div v-if="show" class="tooltip-content tooltip-text">
        {{ label }}
      </div>
    </transition>
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: 'var(--color-outline)' },
    filled: { type: Boolean, default: false },
    label: { type: String, default: '' }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    iconUrl() {
      if (this.icon) {
        try {
          return new URL(`/src/assets/icons/${this.icon}`, import.meta.url).href;
        } catch (e) {
          return '';
        }
      }
      return '';
    },
    buttonStyle() {
      const style = {
        borderColor: this.color
      };
      
      if (this.filled) {
        style.backgroundColor = this.color;
        style.color = 'white';
      }
      
      return style;
    }
  }
}
</script>

<style scoped>
.tooltip-content {
  position: absolute;
  left: 50%;
  bottom: 150%;
  transform: translateX(-50%);
  background: var(--color-dark-grey);
  color: var(--color-white);
  padding: 8px 12px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  font-size: 13px;
  z-index: 10;
  font-weight: 300;
  width: fit-content;
  text-align: center;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.2s;
}

.tooltip-content::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: var(--color-dark-grey) transparent transparent transparent;
}

.tooltip-text {
  white-space: pre;
  word-break: normal;
  overflow-wrap: normal;
}
.fade-tooltip-enter-active, .fade-tooltip-leave-active {
  transition: opacity 0.2s;
}
.fade-tooltip-enter-from, .fade-tooltip-leave-to {
  opacity: 0;
}
.fade-tooltip-enter-to, .fade-tooltip-leave-from {
  opacity: 1;
}
.outline{
    cursor: pointer;
    background-color: transparent;
    border: 1px solid var(--color-outline);
    height: 34px;
    min-width: 34px;
    border-radius: 10px;
    padding: 0;
    margin: 0;
    position: relative;
}
img{
    width: 100%;
    height: 100%;
}
.outline:hover{
    filter: brightness(120%);
}
</style>