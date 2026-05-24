<template>
  <div class="tooltip-wrapper">
    <span class="tooltip-icon" @mouseenter="show = true" @mouseleave="show = false">?</span>
    <transition name="fade-tooltip">
      <div v-if="show" class="tooltip-content tooltip-text">
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ToolTip",
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
  position: relative;
  width: 18px;
  height: 24px;
}

.tooltip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-weight: 100;
  background: #bbb;
  color: var(--color-white);
  border-radius: 50%;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.2s;
  user-select: none;
}

.tooltip-icon:hover {
  background: rgb(167, 167, 167);
}

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
</style>
