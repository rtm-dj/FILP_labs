<template>
    <div class="colorPickerWrapper">
        <div class="textfileld-row">
            <p class="label">{{ label }}</p>
            <ToolTip v-if="tooltip" :text="tooltip"/>
        </div>
        <input
            data-coloris
            type="text"
            maxlength="7"
            :value="localValue"
            :placeholder="placeholder"
            @input="updateValue($event.target.value)"
            :style="{ borderColor: error ? 'var(--color-red)' : '' }"
            :required="required"
        />
        <svg v-if="localValue.length > 1" @click="updateValue('#000000')" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.97331 5L9.66665 8.69333V9.66667H8.69331L4.99998 5.97333L1.30665 9.66667H0.333313V8.69333L4.02665 5L0.333313 1.30667V0.333332H1.30665L4.99998 4.02667L8.69331 0.333332H9.66665V1.30667L5.97331 5Z" fill="#B5B7CB"/>
        </svg>

        <div 
            class="color" 
            :style="{ backgroundColor: colorValue ? colorValue : '' }" 
        >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        error: Boolean,
        modelValue: {
            type: String,
            default: '#',
        },
        placeholder: String,
        required: {
            type: Boolean,
            default: false
        },
        tooltip:{
            type: String,
            default: null,
        }   
    },
    emits: ['update:modelValue'],
    data () {
        return {
            localValue: '',
            colorValue: '',
        }
    },
    mounted(){
        this.localValue = this.modelValue;
        this.colorValue = this.modelValue;
    },
    watch: {
        modelValue(newValue) {
            this.localValue = newValue;
            this.colorValue = newValue;
        }
    },
    methods: {
        updateValue(newValue) {
            this.localValue = newValue;
            if (newValue == '') {
                this.colorValue = '';
                this.localValue = '#';
            } else {
                this.colorValue = newValue;
            }
            this.$emit('update:modelValue', newValue);
        },
    },
};
</script>


<style scoped>
.textfileld-row{
    display: flex;
    align-items: center;
    gap: 10px;
}
.color{
    position: absolute;
    width: 85px;
    height: 25px;
    bottom: 5px;
    right: 38px;
    border-radius: 5px;
}
svg{
    cursor: pointer;
    position: absolute;
    width: 10px;
    aspect-ratio: 1;
    bottom: 12.5px;
    right: 15px;
}
svg:hover{
    filter: brightness(50%);
}
.colorPickerWrapper{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    position: relative;
}
input{
    font-size: 14px;
    border-radius: 10px;
    padding: 8px 15px;
    border: 1px solid var(--color-outline);
    color: var(--color-dark-grey);
    padding-right: 35px;
    font-family: 'Nata Sans';
    background-color: transparent;
}
input:focus{
    outline: none;
    border: 1px solid var(--color-accent);
}
input::placeholder{
    font-family: 'Nata Sans';
    color: #808080;
}

.label{
    font-size: 14px;
    color: var(--color-dark-grey);
    margin: 0;
    font-family: 'Nata Sans';
}
.counter{
    font-size: 14px;
    color: #808080;
    display: flex;
    justify-content: end;
    text-align: end;
    margin: 0;
}
</style>