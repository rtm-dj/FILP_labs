<template>
    <div class="menu-container">
        <div class="menu">
            <slot name="before-tabs"></slot>
            <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="setActiveTab(tab.id)"
                :style="getTabStyle(tab.id)"
                class="tab-button"
            >
                <slot name="tab-content" :tab="tab" :isActive="isTabActive(tab.id)">
                    <span class="tab-label">{{ tab.label }}</span>
                    <div 
                        :style="{ backgroundColor: isTabActive(tab.id) ? activeColor : 'transparent' }" 
                        class="underline"
                    ></div>
                </slot>
            </button>
            <slot name="after-tabs"></slot>
        </div>
        <slot name="underline">
            <div class="underline-basic"></div>
        </slot>
    </div>
    
</template>

<script>
export default {
    name: 'TabsMenu',
    
    props: {
        tabs: {
            type: Array,
            required: true,
            default: () => [
                { id: 'tab1', label: 'Вкладка 1' },
                { id: 'tab2', label: 'Вкладка 2' },
                { id: 'tab3', label: 'Вкладка 3' },
            ],
            validator: (value) => {
                return value.every(tab => tab.id && tab.label)
            }
        },

        modelValue: {
            type: String,
            default: 'tabname'
        },

        activeColor: {
            type: String,
            default: 'var(--color-accent)'
        },

        inactiveColor: {
            type: String,
            default: 'var(--color-light-grey)'
        }
    },
    
    emits: ['update:modelValue', 'tab-change'],
    
    data() {
        return {
            activeTab: this.modelValue
        }
    },
    
    watch: {
        modelValue(newVal) {
            this.activeTab = newVal
        }
    },
    
    methods: {
        setActiveTab(tabId) {
            this.activeTab = tabId
            this.$emit('update:modelValue', tabId)
            this.$emit('tab-change', tabId)
        },
        
        isTabActive(tabId) {
            return this.activeTab === tabId
        },
        
        getTabStyle(tabId) {
            return {
                color: this.isTabActive(tabId) ? this.activeColor : this.inactiveColor
            }
        }
    }
}
</script>

<style scoped>

.menu-container {
    position: relative;
    width: 100%;
}

.menu {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    position: relative;
    overflow-x: auto;
}

.underline-basic {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: var(--color-outline);
}

.underline {
    height: 1px;
    width: 100%;
    margin-top: 10px;
}

.menu button:hover {
    background-color: transparent;
    cursor: pointer;
}

.menu button {
    background-color: transparent;
    font-size: 14px;
    font-weight: 400;
    font-family: 'Nata Sans';
    border: none;
    padding: 0;
    min-width: fit-content;
    position: relative;
    z-index: 1;
}
</style>