<template>
    <span :class="'badgeBox--' + color">
        {{ label }}
    </span>
</template>

<script>
export default {    
    props: ['label', 'color']
}
</script>

<style scoped>
.badgeBox--green{
    background-color: #00ff3725;
    color: var(--color-green);
}
.badgeBox--red{
    background-color: #ff000016;
    color: var(--color-red);
}
.badgeBox--yellow{
    background-color: #ffc40025;
    color: var(--color-orange);
}
.badgeBox--blue{
    background-color: #006aff25;
    color: var(--color-blue);
}
.badgeBox--black{
    background-color: #00000016;
    color: var(--color-black);
}
.badgeBox--blue, .badgeBox--green, .badgeBox--red, .badgeBox--yellow, .badgeBox--black{
    justify-content: end;
    min-width: fit-content;
    width: fit-content;
    height: fit-content;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 8px;
    font-weight: 600;
    white-space: nowrap;
}
</style>