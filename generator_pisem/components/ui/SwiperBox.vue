<template>
    <div
        class="swiperBox"
        :class="{ 'show-left': fadeLeft, 'show-right': fadeRight }"
    >
        <button
            v-if="canScroll && fadeLeft"
            type="button"
            class="arrow arrowLeft"
            aria-label="Прокрутить влево"
            @click="scrollBy(-stepPx)"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button
            v-if="canScroll && fadeRight"
            type="button"
            class="arrow arrowRight"
            aria-label="Прокрутить вправо"
            @click="scrollBy(stepPx)"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div
            ref="scrollRef"
            class="swiperTrack"
            :style="{ gap: gap + 'px' }"
            @scroll="updateFades"
        >
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
    stepPx: {
        type: Number,
        default: 200,
    },
    gap: {
        type: Number,
        default: 10,
    },
})

const scrollRef = ref(null)
const fadeLeft = ref(false)
const fadeRight = ref(false)
const canScroll = ref(false)

let resizeObserver = null

function scrollBy(delta) {
    const el = scrollRef.value
    if (!el) return
    el.scrollBy({ left: delta, behavior: 'smooth' })
    requestAnimationFrame(() => {
        setTimeout(() => updateFades({ target: el }), 300)
    })
}

function updateFades(event) {
    if (import.meta.server) return
    const el = event?.target ?? scrollRef.value
    if (!el) return
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    const epsilon = 1
    canScroll.value = maxScrollLeft > epsilon
    fadeLeft.value = el.scrollLeft > epsilon
    fadeRight.value = el.scrollLeft < maxScrollLeft - epsilon
}

const resizeHandler = () => updateFades({ target: scrollRef.value })

onMounted(() => {
    nextTick(() => {
        updateFades({ target: scrollRef.value })
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', resizeHandler)
        }
        const el = scrollRef.value
        if (el && typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => updateFades({ target: scrollRef.value }))
            resizeObserver.observe(el)
        }
    })
})

onUnmounted(() => {
    resizeObserver?.disconnect()
    resizeObserver = null
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeHandler)
    }
})
</script>

<style scoped>
.swiperBox {
    position: relative;
    min-width: 0;
    width: 100%;
    max-width: 100%;
}
.swiperTrack {
    overflow-x: auto;
    overflow-y: visible;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 0;
    height: fit-content;
    scrollbar-width: none;
    -ms-overflow-style: none;
    box-sizing: content-box;
    min-height: 40px;
}
.swiperTrack::-webkit-scrollbar {
    display: none;
}
.swiperBox::before,
.swiperBox::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 32px;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease;
}
.swiperBox::before {
    left: 0;
    background: linear-gradient(to right, var(--color-white) 0%, transparent 100%);
}
.swiperBox::after {
    right: 0;
    background: linear-gradient(to left, var(--color-white) 0%, transparent 100%);
}
.swiperBox.show-left::before {
    opacity: 1;
}
.swiperBox.show-right::after {
    opacity: 1;
}

.arrow {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--color-outline);
    color: var(--color-dark-grey);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s, background 0.2s;
}
.arrow:hover {
    background: var(--color-outline);
}
.arrowLeft {
    left: 4px;
}
.arrowRight {
    right: 4px;
}
@media (width > 768px) {
    .arrow {
        display: flex;
    }
    /* .swiperTrack {
        padding: 0 46px;
    } */
}
</style>
