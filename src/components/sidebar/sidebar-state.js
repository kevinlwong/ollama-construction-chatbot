import { ref, computed } from 'vue';

export const sidebarCollapsed = ref(true)
export const toggleSidebar = () => (sidebarCollapsed.value = !sidebarCollapsed.value)

export const SIDEBAR_WIDTH = 300;
export const SIDEBAR_WIDTH_COLLAPSED = 55
export const sidebarWidth = computed(
    () => `${sidebarCollapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)