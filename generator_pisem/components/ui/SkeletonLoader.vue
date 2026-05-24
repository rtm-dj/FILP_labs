<template>
    <div class="skeleton">
  
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.skeleton {
    background: linear-gradient(90deg, var(--color-background), var(--color-outline), var(--color-background));
    background-size: 200% 100%;
    border-radius: 10px;
    animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>