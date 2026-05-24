<template>
    <div class="counterBox">
        <p class="label" v-if="label">{{ label }}</p>
        <div class="counterBlock">
            <div
                class="decrease"
                @click="decrease"
                :style="{ borderColor: error ? 'var(--color-red)' : '' }"
            >
                <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.826 0.872H8.204V2.272H0.826V0.872Z" fill="#605F5E"/>
                </svg>
            </div>
            <input
                ref="input"
                class="counterValue"
                type="text"
                :placeholder="min"
                :value="displayValue"
                @input="onInput"
                @focus="selectAll"
                :style="{ borderColor: error ? 'var(--color-red)' : '' }"
            >
            <div
                class="increase"
                @click="increase"
                :style="{ borderColor: error ? 'var(--color-red)' : '' }"
            >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.14 8.464V0.624H5.54V8.464H4.14ZM0.92 5.244V3.844H8.76V5.244H0.92Z" fill="#605F5E"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CounterBox",
    props: {
        label: String,
        modelValue: {
            type: Number,
            default: 0,
        },
        error: Boolean,
        step: {
            type: Number,
            default: 1,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: Infinity,
        },
    },
    computed: {
        displayValue() {
            if (typeof this.localValue === 'number' && !isNaN(this.localValue)) {
                return this.localValue;
            }
            return this.min;
        }
    },
    data() {
        return {
            localValue: this.modelValue,
        };
    },
    watch: {
        modelValue(newVal) {
            this.localValue = newVal;
        }
    },
    methods: {
        clamp(val) {
            let n = Number(val);
            if (isNaN(n)) n = this.min;
            if (n < this.min) n = this.min;
            if (n > this.max) n = this.max;
            return n;
        },
        updateValue(newValue) {
            const clamped = this.clamp(newValue);
            this.localValue = clamped;
            this.$emit('update:modelValue', clamped);
        },
        increase() {
            let current = Number(this.localValue);
            if (isNaN(current)) current = this.min;
            let next = current + this.step;
            this.updateValue(next);
        },
        decrease() {
            let current = Number(this.localValue);
            if (isNaN(current)) current = this.min;
            let next = current - this.step;
            this.updateValue(next);
        },
        onInput(e) {
            let val = e.target.value;
            if (val === '') {
                this.localValue = '';
                this.$emit('update:modelValue', this.min);
                return;
            }
            this.updateValue(val);
        },
        selectAll(e) {
            if (e && e.target && typeof e.target.select === 'function') {
                e.target.select();
            }
        }
    }
};
</script>
  
<style scoped>
.label{
    font-size: 14px;
    color: var(--color-dark-grey);
    margin: 0;
}

.counterBox{
    box-sizing: border-box;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.counterBlock{
    height: 34px;
    display: flex;
    align-items: center;
}
.decrease{
    border: 1px solid var(--color-outline);
    border-radius: 7px 0 0 7px;
    width: 40px;
    height: 100%;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
}
.decrease:hover{
    border-color: var(--color-light-grey);
    cursor: pointer;
}

.decrease:hover svg path{
    fill: var(--color-light-grey);
}
.increase{
    border: 1px solid var(--color-outline);
    background-color: transparent;
    border-radius: 0 7px 7px 0;
    width: 40px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}
.increase:hover{
    border-color: var(--color-light-grey);
    cursor: pointer;
}
.increase:hover svg path{
    fill: var(--color-light-grey);
}
.counterValue{
    border-top: 1px solid var(--color-outline);
    border-bottom: 1px solid var(--color-outline);
    width: 100px;
    height: 100%;
    font-size: 14px;
    padding: 0;
    color: var(--color-dark-grey);
    font-family: 'Nata Sans';
    border-right: none;
    border-left: none;
    text-align: center;
    background-color: transparent;
}
.counterValue:focus{
    outline: none;
}
.counterValue::placeholder{
    color: var(--color-outline);
}
</style>