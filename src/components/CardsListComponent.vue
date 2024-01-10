<script setup lang="ts">
interface Card {
  name: string
  url: string
}
defineProps({
  cards: Array as () => Card[]
})
</script>

<template>
  <h2>Cards list</h2>
  <div v-for="(card, index) in cards" :key="card.name">
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`"
    />
    <div>{{ card.name }}</div>
  </div>
</template>
