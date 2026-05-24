<template>
  <div class="wrapper">
    <p class="label">{{ label }}</p>
    <input
      type="tel"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @blur="$emit('blur')"
      :style="{ borderColor: error ? 'var(--color-red)' : '' }"
      :required="required"
      maxlength="18"
      :disabled="disabled"
    />
    <svg
      v-if="modelValue && modelValue.length > 0 && !disabled"
      @click="clearValue"
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
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    error: Boolean,
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean
  },
  emits: ['update:modelValue', 'blur'],
  methods: {
    onInput(e) {
      let rawValue = e.target.value.replace(/\D/g, "");
      const maskedValue = this.formatPhone(rawValue);

      e.target.value = maskedValue;

      this.$emit("update:modelValue", maskedValue);
    },
    formatPhone(value) {
      let v = value.replace(/\D/g, "").substring(0, 11); // макс 11 цифр
      let result = "+7";

      if (v.length > 1) result += " (" + v.substring(1, 4);
      if (v.length >= 4) result += ") " + v.substring(4, 7);
      if (v.length >= 7) result += "-" + v.substring(7, 9);
      if (v.length >= 9) result += "-" + v.substring(9, 11);

      return result.trim();
    },
    clearValue() {
      this.$emit("update:modelValue", "");
    },
  },
};
</script>
  



<style scoped>
svg{
    cursor: pointer;
    position: absolute;
    width: 10px;
    aspect-ratio: 1;
    top: 37px;
    right: 15px;
}
svg:hover{
    filter: brightness(50%);
}
.wrapper{
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