<template>
  <div class="colorPalette">
    <div 
      v-for="(color, index) in colorArray" 
      :key="index"
      class="colorSwatch"
      :style="{ background: color }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ColorPalette',
  props: {
    colors: {
      type: Object,
      required: true,
      validator: function(value) {
        const requiredColors = ['backgroundColor', 'cardsColor', 'textColor', 'accentColor'];
        return requiredColors.every(color => color in value);
      }
    }
  },
  computed: {
    colorArray() {
      return [
        this.colors.backgroundColor,
        this.colors.cardsColor,
        this.colors.textColor,
        this.colors.accentColor
      ];
    }
  }
}
</script>

<style scoped>
.colorPalette:hover{
  scale: 1.05;
}
.colorPalette {
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  border: 1px solid var(--color-outline);
  overflow: hidden;
  min-width: 80px;
}

.colorSwatch {
  width: 20px;
  height: 40px;
}
</style>
