<script>
import { collapsed, toggleSidebar, sidebarWidth } from './state.js'

export default {
    props: {},
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth };
    }
}
</script>

<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <span class="hamburger-icon" @click="toggleSidebar">
            <i class="fa-solid fa-bars"></i>
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
</style>