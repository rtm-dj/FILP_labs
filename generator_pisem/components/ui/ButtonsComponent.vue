<template>
  <button
    :class="buttonClass"
    :style="buttonStyle"
    :type="resolvedType"
    :form="form"
    :disabled="disabled || isLoading"
    :aria-busy="isLoading ? 'true' : 'false'"
    :aria-live="isLoading ? 'polite' : 'off'"
  >
  <div class="button-content">
    <svg v-if="variant == 2" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px;">
      <path d="M14 7L17 10M4.99998 6V10M19 14V18M9.99998 2V4M6.99998 8H2.99998M21 16H17M11 3H8.99998M21.64 3.64L20.36 2.36C20.2475 2.24632 20.1135 2.15607 19.9659 2.09448C19.8183 2.03289 19.6599 2.00118 19.5 2.00118C19.34 2.00118 19.1817 2.03289 19.0341 2.09448C18.8864 2.15607 18.7525 2.24632 18.64 2.36L2.35998 18.64C2.2463 18.7525 2.15605 18.8865 2.09446 19.0341C2.03287 19.1817 2.00116 19.3401 2.00116 19.5C2.00116 19.6599 2.03287 19.8183 2.09446 19.9659C2.15605 20.1135 2.2463 20.2475 2.35998 20.36L3.63998 21.64C3.7518 21.7549 3.88552 21.8462 4.03323 21.9086C4.18094 21.971 4.33965 22.0031 4.49998 22.0031C4.66032 22.0031 4.81903 21.971 4.96674 21.9086C5.11445 21.8462 5.24816 21.7549 5.35998 21.64L21.64 5.36C21.7549 5.24818 21.8462 5.11447 21.9086 4.96676C21.971 4.81905 22.0031 4.66034 22.0031 4.5C22.0031 4.33966 21.971 4.18095 21.9086 4.03324C21.8462 3.88553 21.7549 3.75182 21.64 3.64Z" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="loader" :class="{ active: showLoader }"></div>
    <span class="label" :class="{ hidden: showLoader }">
      {{ label }}
    </span>
  </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  backgroundColor: { type: String, default: null },
  variant: { type: Number, default: 1 },
  label: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  form: { type: String, default: null },
})

const resolvedType = computed(() => props.type || 'button')

const buttonClass = computed(() => {
  if (props.variant === 3) return 'outline'
  if (props.variant === 2) return 'secondary'
  return 'main'
})

const buttonStyle = computed(() => {
  if (props.disabled) {
    return { backgroundColor: 'var(--color-outline)' }
  }
  if (props.variant === 1) {
    return { backgroundColor: props.backgroundColor || 'var(--color-accent)' }
  }
  if (props.variant === 3) {
    return { backgroundColor: props.backgroundColor || 'transparent' }
  }
  return undefined
})

const showLoader = computed(() => (props.variant === 1 && props.isLoading))
</script>

<style scoped>
.loader {
  height: 10px;
  aspect-ratio: 5;
  -webkit-mask: linear-gradient(90deg,#0000 ,#ffffff 20% 80%,#0000);
  background: radial-gradient(closest-side at 37.5% 50%,#ffffff 94%,#0000) 0/calc(80%/3) 100%;
  animation: l48 .75s infinite ease;
}
@keyframes l48 {
  100% {background-position: 36.36%}
}
.main{
    font-family: 'Nata-Sans';
    font-size: 12px;
    cursor: pointer;
    background-color: var(--color-accent);
    border: none;
    height: 34px;
    padding: 10px 20px;
    border-radius: 10px;
    color: var(--color-white);
    font-weight: 600;
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
}
.main:hover:not([disabled]){
    filter: brightness(120%);
}
.main[disabled] {
    cursor: not-allowed;
}

.secondary {
    font-family: 'Nata-Sans';
    font-size: 10px;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 4px 10px;
    border-radius: 10px;
    color: var(--color-accent);
    font-weight: 600;
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.secondary::before {
    content: '';
    position: absolute;
    bottom: -368%;
    left: -61%;
    width: 220%;
    height: 800%;
    background: conic-gradient(
        #ff8080,
        #ffbe7d,
        #ffff7d,
        #7fff7f,
        #7affff,
        #c183ff,
        #ff79ff, 
        #ff7e7e
    );
    z-index: -1;
    animation: rotate 3s linear infinite;
    will-change: transform;
    transition: all 0.3s ease;
    opacity: 0;
}
.secondary:hover::before{
    opacity: 1;
}

.secondary::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: var(--color-white);
    border-radius: 9px;
    z-index: -1;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.outline{
    font-family: 'Nata-Sans';
    font-size: 12px;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid var(--color-outline);
    height: 34px;
    padding: 10px 20px;
    border-radius: 10px;
    color: var(--color-light-grey);
    font-weight: 600;
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
}
.outline:hover{
    border-color: var(--color-light-grey);
    color: var(--color-dark-grey);
}


.button-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s ease;
}

.loader.active {
  opacity: 1;
}

.label {
  transition: opacity 0.1s ease;
}

.label.hidden {
  opacity: 0;
}
</style>