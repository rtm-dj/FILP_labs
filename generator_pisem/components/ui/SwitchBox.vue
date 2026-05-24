<template>
    <div class="container" @click="value = !value">
        <div class="switch" :class="{ 'switch--active': value }">
            <div class="circle" :class="{ 'circle--active': value }"></div>
        </div>
        <p class="label">{{ label }}</p>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        label: String,
    },
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            },
        },
    },
}
</script>

<style scoped>
.container {
    width: fit-content;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: start;
    cursor: pointer;
}

.label {
    font-weight: 400;
    color: var(--color-dark-grey);
    font-size: 14px;
    margin: 0;
}

.switch {
    width: 30px;
    height: 14px;
    border: 1px solid;
    border-radius: 24px;
    position: relative;
    background-color: var(--color-white);
    border-color: var(--color-light-grey);
    transition: all 0.2s ease;
}

.switch--active {
    background-color: var(--color-white);
    border-color: var(--color-accent);
}

.circle {
    top: -3px;
    left: -3px;
    position: absolute;
    height: 20px;
    aspect-ratio: 1;
    background-color: var(--color-light-grey);
    border-radius: 13px;
    transition: all 0.2s ease;
}

.circle--active {
    left: calc(100% - 16px);
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 20%));
    background-color: var(--color-accent);
}
</style>