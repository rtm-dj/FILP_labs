<template>
  <div class="messageContainer">
    <img :src="iconUrl" alt="iconBox" class="messageIcon" v-if="iconUrl">
    <h1 class="messageTitle">{{ title }}</h1>
    <p class="messageDescription">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    iconUrl() {
      if (this.data && this.data.icon) {
        try {
          return new URL(`/src/assets/icons/${this.data.icon}`, import.meta.url).href;
        } catch (e) {
          return '';
        }
      }
      return '';
    },
    title() {
      return this.data && this.data.title ? this.data.title : '';
    },
    subtitle() {
      return this.data && this.data.subtitle ? this.data.subtitle : '';
    }
  }
}
</script>

<style scoped>
.messageContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
.messageDescription{
    max-width: 400px;
    text-align: center;
    margin: 0;
    font-size: 14px;
    font-weight: 300;
    color: var(--color-light-grey);
}
.messageTitle{
    text-align: center;
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: var(--color-dark-grey);
}
.messageIcon{
    width: 140px;
    margin-bottom: -20px;
}

@media (max-width: 768px){
  .messageContainer{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
  }
  .messageDescription{
      max-width: 300px;
      text-align: center;
      margin: 0;
      font-size: 12px;
      font-weight: 300;
      color: var(--color-light-grey);
  }
  .messageTitle{
      text-align: center;
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: var(--color-dark-grey);
  }
  .messageIcon{
      width: 120px;
      margin-bottom: -20px;
  }
}
</style>