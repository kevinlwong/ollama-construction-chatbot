<template>
  <div>
    <h1>Ollama Multi-Model Chatbot</h1>

    <!--Sidebar-->
    <Sidebar />

    <!--Model Selection-->
    <ModelSelection />

    <!-- Chatbot Component (Pass the Active Model) -->
    <Chatbot :model="selectedModel" />
  </div>
</template>

<script>
import Chatbot from "./components/Chatbot.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import ModelSelection from "./components/model-selection/ModelSelection.vue";
import { selectedModel } from "./components/model-selection/modelselect-state.js";

export default {
  components: { Chatbot, Sidebar, ModelSelection },
  setup() {
    return { selectedModel };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  background: #333;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.tabs button.active {
  background: #007bff;
  font-weight: bold;
}
</style>
