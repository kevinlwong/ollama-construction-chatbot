import { ref, computed } from 'vue';
import { sidebarCollapsed } from '../sidebar/sidebar-state';

export const selectedModel = ref('deepseek-r1:7b') // default model
export const models = [
    { model: 'deepseek-r1:7b', stage: 'Pre-construction'},
    { model: 'qwen2.5:7b', stage: 'Construction'}
];

export const selectedStage = computed(() => {
    const foundModel = models.find(m => m.model === selectedModel.value);
    return foundModel ? foundModel.stage : 'Unknown Stage';
});

export const modelSelectCollapsed = ref(true);
export const toggleDropdown = () => (modelSelectCollapsed.value = !modelSelectCollapsed.value);
export const selectModel = (model) => {
    selectedModel.value = model;
    modelSelectCollapsed.value = true;
};

export const SIDEBAR_OPEN_POSITION = 345;
export const SIDEBAR_CLOSED_POSITION = 100;
export const dropdownPosition = computed(
    () => `${sidebarCollapsed.value ? SIDEBAR_CLOSED_POSITION : SIDEBAR_OPEN_POSITION}px`
)