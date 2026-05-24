<template>
    <div class="wrapper">
      <div class="textfield-row">
        <p class="label">{{ label }}</p>
        <ToolTip v-if="tooltip" :text="tooltip" />
      </div>
  
      <textarea
        :maxlength="maxLength"
        :value="localValue"
        :placeholder="placeholder"
        @input="updateValue($event.target.value)"
        :style="{ 
          borderColor: error ? 'var(--color-red)' : '',
          height: rows ? 'auto' : '100px',
          minHeight: '100px'
        }"
        :rows="rows"
        :required="required"
        ref="textarea"
      ></textarea>
  
      <svg
        v-if="localValue.length > 0 && clearable"
        @click="updateValue('')"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.97331 5L9.66665 8.69333V9.66667H8.69331L4.99998 5.97333L1.30665 9.66667H0.333313V8.69333L4.02665 5L0.333313 1.30667V0.333332H1.30665L4.99998 4.02667L8.69331 0.333332H9.66665V1.30667L5.97331 5Z"
          fill="#B5B7CB"
        />
      </svg>
  
      <p v-if="maxLength > 0" class="counter">
        {{ localValue.length }}/{{ maxLength }}
      </p>
    </div>
  </template>
  
  
<script>
export default {
  props: {
    label: String,
    maxLength: Number,
    error: Boolean,
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: null,
    },
    rows: {
      type: Number,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      localValue: this.modelValue,
    };
  },
  mounted() {
    this.autoResize();
  },
  watch: {
    modelValue(newVal) {
      this.localValue = newVal;
      this.$nextTick(this.autoResize);
    },
    localValue() {
      this.$nextTick(this.autoResize);
    },
  },
  methods: {
    updateValue(newValue) {
      this.localValue = newValue;
      this.$emit('update:modelValue', newValue);
      this.$nextTick(this.autoResize);
    },
    autoResize() {
      if (!this.rows && this.$refs.textarea) {
        const textarea = this.$refs.textarea;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
      }
    },
    focus() {
      if (this.$refs.textarea) {
        this.$refs.textarea.focus();
      }
    },
  },
};
</script>


<style scoped>
.textfield-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

svg {
    cursor: pointer;
    position: absolute;
    width: 10px;
    aspect-ratio: 1;
    top: 38px;
    right: 15px;
    z-index: 2;
}

svg:hover {
    filter: brightness(50%);
}

.wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    position: relative;
}

textarea {
    font-size: 14px;
    border-radius: 10px;
    padding: 10px 15px;
    border: 1px solid var(--color-outline);
    color: var(--color-dark-grey);
    padding-right: 35px;
    font-family: 'Nata Sans';
    background-color: transparent;
    resize: vertical;
    min-height: 100px;
    box-sizing: border-box;
}

textarea:focus {
    outline: none;
    border: 1px solid var(--color-accent);
}

textarea::placeholder {
    font-family: 'Nata Sans';
    color: #808080;
}

.label {
    font-size: 14px;
    color: var(--color-dark-grey);
    margin: 0;
    font-family: 'Nata Sans';
}

.counter {
    font-size: 14px;
    color: #808080;
    display: flex;
    justify-content: end;
    text-align: end;
    margin: 0;
}
</style>