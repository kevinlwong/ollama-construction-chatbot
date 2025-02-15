<script>
import { sidebarCollapsed, toggleSidebar, sidebarWidth } from './sidebar-state.js'

export default {
    props: {},
    setup() {
        return { sidebarCollapsed, toggleSidebar, sidebarWidth };
    }
}
</script>

<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <span class="hamburger-icon" @click="toggleSidebar">
            <i class="fa-solid fa-bars"></i>
        </span>
        <span class="settings-icon">
            <i class="fa-solid fa-gear"></i>
        </span>
        <span class="plus-icon">
            <i class="fa-solid fa-circle-plus"></i>
        </span>
    </div>

</template>

<style>
:root {
    --sidebar-bg-color: #C5E0F3;
}
</style>

<style scoped>
.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.hamburger-icon {
    position: absolute;
    top: 5px;
    left: 15px;
    padding: 0.75em;
    
    color: #21262F;
}

.settings-icon {
    position: absolute;
    bottom: 5px;
    left: 15px;
    padding: 0.75em;
    
    color: #21262F;
}

.plus-icon {
    position: absolute;
    top: 50px;
    left: 15px;
    padding: 0.75em;
    
    color: #21262F;
}
</style>