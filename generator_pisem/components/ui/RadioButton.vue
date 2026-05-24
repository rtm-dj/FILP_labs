<template>
    <div class="container" :style="{'opacity': disabled ? '50%' : '', 'cursor': disabled ? 'not-allowed' : ''}">
      <div class="box-checked" v-if="checked">
          <div class="circle"></div>
      </div>
      <div class="box" v-else></div>
      <p class="label">{{ label }}</p>
    </div>
</template>

<script>
export default {
    props: ['checked', 'label', 'disabled'],
    data() {
        return {
            statement: false,
        }
    },
    mounted(){
        this.statement = this.checked;
    }
}
</script>

<style scoped>
.container{
    width: fit-content;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: start;
    cursor: pointer;
}
.box{
    width: 24px;
    aspect-ratio: 1;
    border: 1px solid var(--color-outline);
    border-radius: 15px;
}

.box-checked{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    aspect-ratio: 1;
    border: 1px solid var(--color-accent);
    border-radius: 15px;
}

.label{
    font-weight: 400;
    color: var(--color-dark-grey);
    font-size: 14px;
    margin: 0;
}
.circle{
    width: 14px;
    border-radius: 8px;
    aspect-ratio: 1;
    background-color: var(--color-accent);
}
</style>