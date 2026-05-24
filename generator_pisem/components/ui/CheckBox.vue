<template>
    <div class="container" @click="toggle">
        <input 
            type="checkbox" 
            :checked="modelValue" 
            :required="required"
            @change="handleChange"
            class="native-checkbox"
            :aria-required="required"
        />
        <div class="box-checked" v-if="modelValue">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6.1875L8.375 15.8125L4 11.4375" stroke="#4056F4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="box" v-else></div>
        <p class="label">{{ label }}</p>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
    },
    emits: ['update:modelValue'],
    methods: {
        toggle() {
            this.$emit('update:modelValue', !this.modelValue)
        },
        handleChange(event) {
            this.$emit('update:modelValue', event.target.checked)
        },
    }
}
</script>

<style scoped>
.container{
    position: relative;
    width: fit-content;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: start;
    cursor: pointer;
}
.box{
    width: 20px;
    aspect-ratio: 1;
    border: 1px solid var(--color-outline);
    background-color: transparent;
    border-radius: 5px;
}

.box-checked{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    aspect-ratio: 1;
    border: 1px solid var(--color-accent);
    background-color: transparent;
    border-radius: 5px;
}

.label{
    font-weight: 400;
    color: var(--color-dark-grey);
    font-size: 14px;
    margin: 0;
}
img{
    width: 12px;
}

.native-checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
}
</style>