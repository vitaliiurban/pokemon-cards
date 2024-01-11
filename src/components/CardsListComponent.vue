<script setup lang="ts">
import CardComponent from '../components/CardComponent.vue'
interface Card {
  name: string
  url: string
}
defineProps({
  cards: Array as () => Card[]
})
</script>

<template>
  <div class="pt-10">
    <div class="grid grid-cols-5 gap-5 px-20 h-fulls max-sm:grid-cols-2 px-5">
      <CardComponent :cards="cards" />
    </div>
  </div>
</template>
