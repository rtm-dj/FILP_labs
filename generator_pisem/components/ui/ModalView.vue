<template>
    <div class="modalOverlay" :class="{ 'modal-open': isOpen}">
        <div class="modalContent" :class="{ 'modal-content-open': isOpen}" :style="{width: width ? width : '280px'}">

            <header class="modalHeader" v-if="title || hasCloseIcon">
                <h3 class="modalTitle">{{ title }}</h3>
                <svg v-if="hasCloseIcon" class="modalCloseIcon" @click="close()" width="12" height="12" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.893226 0L0 0.893226L4.60677 5.5L0 10.1068L0.893226 11L5.5 6.39323L10.1068 11L11 10.1068L6.39323 5.5L11 0.893226L10.1068 0L5.5 4.60677L0.893226 0Z" fill="#252525"/>
                </svg>
            </header>
            
            <main  class="content">
                <slot name="content"></slot>
            </main>
            
            <footer v-if="$slots.footer" style="display: flex; gap: 10px; justify-content: end; align-items: center;">
                <slot name="footer" class="modalFooter"></slot>
            </footer>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        isOpen: Boolean,
        width: String,
        hasCloseIcon: { type: Boolean, default: true },
    });

    const emit = defineEmits(['close']);

    const close = () => {
        emit('close');
    };
</script>

<style scoped>
.modalTitle{
    font-size: 18px;
    font-weight: 600;
    color: var(--color-dark-grey);
    margin: 0;
}
.modalCloseIcon path{
    fill: var(--color-light-grey);
}
.modalCloseIcon{
    cursor: pointer;
}
.modalHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    opacity: 0;
    visibility: hidden;
}
.modalOverlay.modal-open {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 1;
    visibility: visible;
}

/* header, main, footer{
    z-index: 2;
    position: relative;
} */
.modalContent{
    background: #ffffff;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    gap: 30px;
    flex-direction: column;
    position: relative;
    opacity: 0;
    scale: 0.98;
    transition: scale 0.2s ease, opacity 0.2s ease;
}

.modal-content-open {
    opacity: 1;
    scale: 1;
}

.modalClose {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.modalHeader>>>img{
    width: 160px;
}

@media (max-width: 768px){
    .modalContent{
        max-height: 80vh;
        margin: 0 10px;
        padding: 20px;
    }
    .content{
        overflow: scroll;
    }
    .modalHeader>>>svg{
        width: 60px;
        margin-bottom: 0px;
        margin-top: -15px;
    }
}
</style>