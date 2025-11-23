<template>
  <ResolutionAlertVue v-if="screenWidth < 1200" />
  <div style="display: flex; padding: 20px; height: 100vh; gap: 20px; background-color: #fff; justify-content: space-around;">
    <side-menu style="min-width: 250px;"/>
    <v-main max-width="80%">
      <slot></slot>
    </v-main>
  </div>
</template>

<script setup>
import ResolutionAlertVue from "../ResolutionAlert.vue";
import { ref } from "vue";

const screenWidth = ref(window.innerWidth);
</script>
