<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <header>
    <HeaderComponent />
  </header>
  <RouterView />
</template>
