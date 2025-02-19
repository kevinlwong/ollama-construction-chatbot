<script>
import {
  selectedModel,
  selectedStage,
  models,
  modelSelectCollapsed,
  toggleDropdown,
  selectModel,
  dropdownPosition,
} from "./modelselect-state.js";
import {
  ref,
  computed
} from 'vue';

export default {
  setup() {

    const groupedModels = computed(() => {
      return models.reduce((acc, model) => {
        if (!acc[model.stage]) acc[model.stage] = [];
        acc[model.stage].push(model);
        return acc;
      }, {});
    });

    return {
      selectedModel,
      selectedStage,
      models,
      modelSelectCollapsed,
      toggleDropdown,
      selectModel,
      dropdownPosition,
      groupedModels
    };
  },
};
</script>

<template>
  <div class="dropdown-container" :style="{ left: dropdownPosition }">
    <button class="dropdown-button" @click="toggleDropdown">
      <div class="model-info">
        <span class="model-name">{{ selectedModel }}</span>
        <span class="model-stage">{{ selectedStage }}</span>
      </div>
      <span class="dropdown-arrow">
        <i class="fa-solid fa-chevron-down"></i>
      </span>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="!modelSelectCollapsed" class="dropdown-menu">
      <div v-for="(stage, stageName) in groupedModels" :key="stageName">
        <div class="dropdown-stage">{{ stageName }}</div>
        <div 
          v-for="model in stage" 
          :key="model.model" 
          @click="selectModel(model.model)" 
          class="dropdown-item" 
          :class="{ active: model.model === selectedModel }"
        >
          {{ model.model }}
        </div>
      </div>
      </div>
      <!-- old code for dropdown menu -->
    <!-- <div v-if="!modelSelectCollapsed" class="dropdown-menu">
      <div
        v-for="(item, index) in models"
        :key="index"
        class="dropdown-item"
        @click="selectModel(item.model)"
      >
        {{ item.model }}
      </div>
    </div> -->
  </div>
</template>


<style>
:root {
  --dropdown-bg-color: #c5e0f3;
}
</style>

<style scoped>

/* Dropdown Container */
.dropdown-container {
  position: absolute;
  top: 20px;
  display: flex;
  align-items: center;
  transition: 0.3s ease;
}
/* End Dropdown Container */

.dropdown-stage{
  font-size: 14px;
  font-weight: bold;
  margin-top: 1px;
  margin-bottom: 1px;
  color: #646464;
  text-align: left;
  padding-left: 5px;
}

/* Dropdown Button */
.dropdown-button {
  background-color: white;
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  width: 175px;
  cursor: pointer;
  outline: none;
}

.dropdown-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  outline: none;
  border: 1px solid transparent;
}

.dropdown-arrow {
  color: #21262f;
}

.model-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.model-name {
  font-size: 18px;
  color: #646464;
}

.model-stage {
  font-size: 13px;
  justify-content: space-between;
  color: #646464;
}
/* End Dropdown Button */

/* Dropdown menu */
.dropdown-menu {
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
  padding-left: 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  font-size: 16px;
  color: #646464;
  text-align: left;
}

.dropdown-item:hover {
  /* background-color: rgba(0, 0, 0, 0.1); */
  background: #a8d0e6;
}
/* End Dropdown menu */
</style>
