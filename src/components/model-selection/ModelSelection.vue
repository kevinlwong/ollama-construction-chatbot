<script>
import { selectedModel, models, modelSelectCollapsed, toggleDropdown, selectModel, dropdownPosition } from './modelselect-state.js'

export default {
    props: {}, 
    setup() {
        return { selectedModel, models, modelSelectCollapsed, toggleDropdown, selectModel, dropdownPosition };
    }
};
</script>

<template>
    <div class="dropdown-container" :style="{ left: dropdownPosition }">
        <button class="dropdown-button" @click="toggleDropdown">
            {{ selectedModel }}
            <span class="dropdown-arrow">
                <i class="fa-solid fa-chevron-down"></i>
            </span>
        </button>

    <!-- Dropdown Menu -->
        <div v-if="!modelSelectCollapsed" class="dropdown-menu">
            <div 
                v-for="(item, index) in models" 
                :key="index" 
                class="dropdown-item" 
                @click="selectModel(item.model)">
                {{ item.model }} ({{ item.stage }})
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --dropdown-bg-color: #C5E0F3;
}
</style>

<style scoped>
/* Dropdown Container */
.dropdown-container{
    position: absolute;
    top: 20px;
    display: flex;
    align-items: center;
    transition: 0.3s ease;
}

/* Dropdown Button */
.dropdown-button {
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 220px;
    font-size: 16px;
    cursor: pointer;
}

.dropdown-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.dropdown-arrow{    
    color: #21262F;
}

.dropdown-menu{
    position: absolute;
    top: 100%;
    left: 0;
    width: 220px;
    background-color: var(--dropdown-bg-color);
    border-radius: 8px;
    padding: 8px 0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.dropdown-item {
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    color: black;
}

.dropdown-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
